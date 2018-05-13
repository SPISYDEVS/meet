import {auth, database, geofireRef} from "../../../config/firebase";
import {fetchUsers} from "../user/api";

//Create the event object in realtime database
export function createEvent(event, user, callback) {

    database.ref('events').push({...event})
        .then((ref) => {

            const updates = {};

            //sent invitations to all users
            Object.keys(event.invitations).forEach(id => {
                updates['/users/' + id + '/eventInvitations/' + ref.getKey()] = true;
            });

            //give the host the event in the database
            updates['/users/' + user.uid + '/eventsAsHost/' + ref.getKey()] = true;

            database.ref().update(updates);

            //store location as a separate child
            geofireRef.set(ref.getKey(), [event.location.latitude, event.location.longitude]);

            callback(true, ref.getKey(), null);

        })
        .catch((error) => callback(false, null, {message: error}));
}

export function fetchEvents(eventIds, callback) {

    Promise.all(eventIds.map(id => {
        return database.ref('events').child(id).once('value');
    }))
        .then(events => {
            const eventObject = {};
            let userIds = [];

            events.forEach(event => {
                eventObject[event.key] = event.val();
                userIds.push(event.val().hostId);
            });

            Promise.all(userIds.map(id => {
                return database.ref('users').child(id).once('value');
            }))
                .then(users => {
                    const userObject = {};
                    users.forEach(user => userObject[user.key] = user.val());

                    const data = {
                        events: eventObject,
                        hosts: userObject
                    };

                    callback(true, data, null)

                })
                .catch((error) => {
                    callback(false, null, {message: error})
                });

        })
        .catch((error) => {
            callback(false, null, {message: error})
        });

}

//Get the user object from the realtime database
export function fetchEvent(eventId, callback) {

    database.ref('events').child(eventId).once('value').then((eventSnap) => {

        let event = eventSnap.val();

        database.ref('users').child(event.hostId).once('value').then((userSnap) => {

            let host = userSnap.val();

            const data = {
                host: {[host.uid]: host},
                event: {[eventSnap.key]: event},
            };

            callback(true, data, null);

        })
    })
        .catch(error => callback(false, null, error));
}


export function rsvpEvent(eventId, user, callback) {

    database.ref('events').child(eventId).child('plannedAttendees').on('value', function (snapshot) {
        callback(true, {eventId: eventId, plannedAttendees: snapshot.val()}, null);
    });

    const updates = {};

    updates['/users/' + user.uid + '/eventsAsAttendee/' + eventId] = true;
    updates['/events/' + eventId + '/plannedAttendees/' + user.uid] = true;
    database.ref().update(updates);

}

export function respondToEventInvitation(eventId, accept, callback) {

    let currentUser = auth.currentUser;

    const updates = {};

    //delete event id from list of event invitations to user
    updates['/users/' + currentUser.uid + '/eventInvitations/' + eventId] = null;

    //update necessary fields if user accepts the event invitations
    if (accept) {
        updates['/users/' + currentUser.uid + '/eventsAsAttendee/' + eventId] = true;
        updates['/events/' + eventId + '/plannedAttendees/' + currentUser.uid] = true;
    }

    console.log(updates);

    database.ref().update(updates);

}
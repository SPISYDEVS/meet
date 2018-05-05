import {auth, database, provider, geofireRef} from "../../../config/firebase";

//Create the event object in realtime database
export function createEvent(event, user, callback) {


    database.ref('events').push({...event})
        .then((ref) => {

            database.ref('users').child(user.uid).child('eventsAsHost').update({[ref.getKey()]: true});

            //store location as a separate child
            geofireRef.set(ref.getKey(), [event.location.latitude, event.location.longitude]);

            callback(true, ref.getKey(), null);
        })
        .catch((error) => callback(false, null, {message: error}));
}

export function fetchMyEvents(eventIds, callback) {

    Promise.all(eventIds.map(id => {
        return database.ref('events').child(id).once('value');
    }))
        .then(events => {
            const eventObject = {};
            events.forEach(event => eventObject[event.key] = event.val());
            callback(true, eventObject, null)
        })
        .catch((error) => {
            callback(false, null, {message: error})
        });
}

export function rsvpEvent(eventId, user, callback) {

    database.ref('events').child(eventId).child('plannedAttendees').on('value', function(snapshot) {
        callback(true, {eventId: eventId, plannedAttendees: snapshot.val()}, null);
    });

    const updates = {};

    //make sure the friend receives the request, and the user is known to have made the request
    updates['/users/' + user.uid + '/eventsAsAttendee/' + eventId] = true;
    updates['/events/' + eventId + '/plannedAttendees/' + user.uid] = true;
    database.ref().update(updates);

    // database.ref('events').child(eventId).child('plannedAttendees').update({[user.uid]: true});
}

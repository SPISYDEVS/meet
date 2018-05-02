import {auth, database, provider, geofireRef} from "../../config/firebase";

//Create the event object in realtime database
export function createEvent(event, user, callback) {
    database.ref('events').push({...event})
        .then((ref) => {
            database.ref('users').child(user.uid).child('events').update({[ref.getKey()]: true});

            //store location as a separate child
            geofireRef.set(ref.getKey(), [event.location.latitude, event.location.longitude]);

            callback(true, ref.getKey(), null);
        })
        .catch((error) => callback(false, null, {message: error}));
}

export function loadEvents(eventIds, callback) {

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

    database.ref('events').child(eventId).child('plannedAttendees').update({[user.uid]: true});
}

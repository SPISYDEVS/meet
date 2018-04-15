import {auth, database, provider} from "../../config/firebase";

//Create the event object in realtime database
export function createEvent(event, user, callback) {
    database.ref('events').push({...event})
        .then((ref) => {
            database.ref('users').child(user.uid).child('events').update({[ref.getKey()]: true});
            callback(true, ref.getKey(), null);
        })
        .catch((error) => callback(false, null, {message: error}));
}

export function loadEvents(eventIds, callback) {

    Promise.all(eventIds.map(id => {
        console.log(id);
        return database.ref('events').child(id).once('value');
    }))
        .then(events => {
            console.log(events);
            const eventObject = {};
            events.forEach(event => eventObject[event.key] = event.val());
            callback(true, eventObject, null)
        })
        .catch((error) => {
            callback(false, null, {message: error})
        });
}
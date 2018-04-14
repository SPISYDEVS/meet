import { auth, database, provider } from "../../config/firebase";

//Create the event object in realtime database
export function createEvent (event, user, callback) {
    database.ref('events').push({ ...event })
        .then((ref) => {
            database.ref('users').child(user.uid).child('events').update({[ref.getKey()]: true});
            callback(true, ref.getKey(), null);
        })
        .catch((error) => callback(false, null, {message: error}));
}
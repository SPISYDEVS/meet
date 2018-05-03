import {auth, database, provider, geofireRef} from "../../config/firebase";

//Create the user object in realtime database
export function fetchUsers(userIds, callback) {
    Promise.all(userIds.map(id => {
        return database.ref('users').child(id).once('value');
    }))
        .then(users => {
            const userObject = {};
            users.forEach(user => userObject[user.key] = user.val());
            callback(true, userObject, null)
        })
        .catch((error) => {
            callback(false, null, {message: error})
        });
}
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

export function sendFriendRequest(userId, requestedFriendId, callback) {

    database.ref('users').child(userId).child('friends').child(requestedFriendId).once('value', function (snapshot) {

        //check if a friend request has been made already (null means it hasn't)
        if (snapshot.val() === null) {

            const updates = {};

            //make sure the friend receives the request, and the user is known to have made the request
            updates[requestedFriendId + '/requestsFrom/' + userId] = true;
            updates[userId + '/friends/' + requestedFriendId] = false;
            database.ref('users').update(updates);

            callback(true, {requestedFriendId: requestedFriendId}, null);
        }


    });
}
import {auth, database} from "../../../config/firebase";

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

export function respondToFriendRequest(userId, requesteeFriendId, accept, callback) {

    database.ref('users').child(userId).child('requestsFrom').child(requesteeFriendId).once('value', function (snapshot) {

        //check if a friend request has been made already (null means it hasn't)
        if (snapshot.val() === true) {

            const updates = {};

            //make sure the friend receives the request, and the user is known to have made the request
            updates[userId + '/requestsFrom/' + requesteeFriendId] = null;

            //update firebase to reflect that the two users are now friends
            if(accept) {
                updates[userId + '/friends/' + requesteeFriendId] = true;
                updates[requesteeFriendId + '/friends/' + userId] = true;
            } else {

                //user rejects the friend request
                updates[requesteeFriendId + '/friends/' + userId] = null;
            }

            database.ref('users').update(updates);

            callback(true, null, null);

        }

    });
}

export function editUser (user, callback) {
    console.log('updating');
    database.ref('users').child(user.uid).update({...user})
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}


export async function uploadFile (blob) {
    let user = auth.currentUser;
    let filename = user.uid + "_profile";

    let ref = storage.ref(filename);
    ref.put(blob);
}
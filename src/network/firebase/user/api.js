import {auth, database} from "../../../config/firebase";

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

export function sendFriendRequest(requesteeId, callback) {
    let currentUser = auth.currentUser;
    database.ref('users').child(currentUser.uid).child('friendRequestsTo').child(requesteeId).once('value', function (snapshot) {

        //check if a friend request has been made already (null means it hasn't)
        if (snapshot.val() === null) {

            const updates = {};

            //make sure the friend receives the request, and the user is known to have made the request
            updates[requesteeId + '/friendRequestsFrom/' + currentUser.uid] = true;
            updates[currentUser.uid + '/friendRequestsTo/' + requesteeId] = true;
            database.ref('users').update(updates);

            callback(true, {requestedFriendId: requesteeId}, null);
        }


    });
}

export function respondToFriendRequest(requesterId, accept, callback) {
    let currentUser = auth.currentUser;
    database.ref('users').child(currentUser.uid).child('friendRequestsFrom').child(requesterId).once('value', function (snapshot) {

        //check if a friend request has been made already (null means it hasn't)
        if (snapshot.val() === true) {

            const updates = {};

            //make sure the friend receives the request, and the user is known to have made the request
            updates[currentUser.uid + '/friendRequestsFrom/' + requesterId] = null;
            updates[requesterId + '/friendRequestsTo/' + currentUser.uid] = null;

            //update firebase to reflect that the two users are now friends
            if(accept) {
                updates[currentUser.uid + '/friends/' + requesterId] = true;
                updates[requesterId + '/friends/' + currentUser.uid] = true;
            }

            database.ref('users').update(updates);

            callback(true, null, null);

        }

    });
}

export function editUser (user, callback) {
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


//Get the user object from the realtime database
export function getUser(userId, callback) {
    database.ref('users').child(userId).once('value').then((snapshot) => {

        let user = snapshot.val();

        callback(true, user, null);
    })
        .catch(error => callback(false, null, error));
}


export function getProfilePic(userId, callback) {
    database.ref('users').child(userId).child('profile').once('value').then((snapshot) => {

        let profile = snapshot.val();

        callback(true, profile, null);
    })
        .catch(error => callback(false, null, error));
}
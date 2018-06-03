import {auth, database} from "../../../config/firebase";
import axios from 'axios';
import {SERVER_URL} from "../../../config/constants";

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

export function revokeFriendship(friendId, callback) {
    let currentUser = auth.currentUser;

    const updates = {};

    //make sure the friend receives the request, and the user is known to have made the request
    updates[friendId + '/friends/' + currentUser.uid] = null;
    updates[currentUser.uid + '/friends/' + friendId] = null;
    database.ref('users').update(updates);

    callback(true, null, null);
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
            if (accept) {
                updates[currentUser.uid + '/friends/' + requesterId] = true;
                updates[requesterId + '/friends/' + currentUser.uid] = true;
            }

            database.ref('users').update(updates);

            callback(true, null, null);

        }

    });
}

export function editUser(user, callback) {
    database.ref('users').child(user.uid).update({...user})
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}


export function uploadProfilePic(userId, profile, callback) {
    database.ref('profilePictures').child(userId).update({
        width: profile.width,
        height: profile.height,
        source: profile.source
    }, function(error) {
        if (error) {
            callback(false, {message: error});
        }
        else {
            callback(true, null);
        }
    });
}


//Get the user object from the realtime database
export function fetchUser(userId, callback) {
    database.ref('users').child(userId).once('value').then((snapshot) => {

        let user = snapshot.val();

        callback(true, {[snapshot.key]: user}, null);
    })
        .catch(error => callback(false, null, error));
}

//Get the user object from the realtime database
export function searchUsers(searchTerm, callback) {

    database.ref('users').orderByChild('firstName')
        .startAt(searchTerm)
        .endAt(searchTerm + "\uf8ff")
        .limitToFirst(20)
        .once('value')
        .then((snapshot) => {

            let users = snapshot.val();

            if (users === null) {
                users = {}
            }

            callback(true, users, null);

        })
        .catch(error => callback(false, null, error));
}

//Get the event object from the realtime database
export function searchEvents(searchTerm, callback) {

    database.ref('events').orderByChild('title')
        .startAt(searchTerm)
        .endAt(searchTerm + "\uf8ff")
        .limitToFirst(20)
        .once('value')
        .then((snapshot) => {


            let events = snapshot.val();


            if (events === null) {
                events = {}
            }

            callback(true, events, null);

        })
        .catch(error => callback(false, null, error));
}

//Get the event object from the realtime database
export function search(searchTerm, callback) {

    console.log(SERVER_URL + 'api/search/all&' + searchTerm);

    axios.get(SERVER_URL + 'api/search/all',
        {
            params: {
                query: searchTerm
            }
        }
    ).then((response) => {
        callback(true, response.data.data, null);
    }).catch(error => callback(false, null, error));

}

export function getProfilePic(userId, callback) {
    database.ref('profilePictures').child(userId).once('value', function(snapshot) {
        let profile = snapshot.val();

        if (profile !== null) {
            callback(true, profile, null);
        }
        else {
            callback(false, null, {message: 'No profile image'});
        }
    }).catch(error => {
        callback(false, null, {message: error});
    });
}


export function getProfilePics(userIds, callback) {
    Promise.all(userIds.map(id => {
        return database.ref('profilePictures').child(id).once('value');
    }))
        .then((profiles) => {
            let results = {};

            profiles.forEach(profile => {
                results[profile.key] = profile.val();
            });

            callback(true, results, null);
        })
        .catch((err) => {
            callback(false, null, {message: err});
        });
}
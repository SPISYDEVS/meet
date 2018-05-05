import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../../config/firebase";


//actions --> fire when on event details or friends tab, lazily load (only when user needs the data)
export function fetchUsers(userIds, successCB, errorCB) {
    return (dispatch) => {
        api.fetchUsers(userIds, function (success, data, error) {
            if (success) {
                dispatch({type: t.USERS_FETCHED, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function sendFriendRequest(requestedFriendId, successCB, errorCB) {

    const userId = auth.currentUser.uid;

    return (dispatch) => {
        api.sendFriendRequest(userId, requestedFriendId, function (success, data, error) {
            if (success) {
                // dispatch({type: t.FRIEND_REQUEST_SENT});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function respondToFriendRequest(requesteeFriendId, accept, successCB, errorCB) {

    const userId = auth.currentUser.uid;

    return (dispatch) => {
        api.respondToFriendRequest(userId, requesteeFriendId, accept, function (success, data, error) {
            if (success) {
                // dispatch({type: t.FRIEND_REQUEST_ACCEPTED});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function updateProfile(user, successCB, errorCB) {
    console.log(user);
    return (dispatch) => {
        api.editUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: t.PROFILE_UPDATED, data: user});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

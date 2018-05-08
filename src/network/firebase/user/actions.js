import * as t from './actionTypes';
import * as eventT from '../event/actionTypes';
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

export function sendFriendRequest(requesteeId, successCB, errorCB) {
    return (dispatch) => {
        api.sendFriendRequest(requesteeId, function (success, data, error) {
            if (success) {
                // dispatch({type: t.FRIEND_REQUEST_SENT});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function respondToFriendRequest(requesterId, accept, successCB, errorCB) {
    return (dispatch) => {
        api.respondToFriendRequest(requesterId, accept, function (success, data, error) {
            if (success) {
                // dispatch({type: t.FRIEND_REQUEST_ACCEPTED});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function updateProfile(user, successCB, errorCB) {
    return (dispatch) => {
        api.editUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: t.PROFILE_UPDATED, data: user});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}


export function getUser(userId, successCB, errorCB) {
    return (dispatch) => {
        api.getUser(userId, function(success, data, error) {
            if (success) {
                dispatch({type: eventT.HOST_OBJ_FETCHED, data: data})
                successCB(data);
            }
            else if (error) errorCB(error)
        });
    };
}
import * as t from './actionTypes';
import * as eventT from '../event/actionTypes';
import * as tagT from '../tag/actionTypes';
import * as api from './api';
import {cache} from '../../../config/cache';

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

export function revokeFriendship(friendId, accept, successCB, errorCB) {
    return (dispatch) => {
        api.revokeFriendship(friendId, accept, function (success, data, error) {
            if (success) {
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function updateProfile(user, successCB, errorCB) {
    return (dispatch) => {
        if (user.profile) {
            api.uploadProfilePic(user.uid, user.profile, (error) => {});
            user.profile = {
                path: `profilePictures/${user.uid}`
            }
        }

        api.editUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: t.PROFILE_UPDATED, data: user});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function fetchUser(userId, successCB, errorCB) {
    return (dispatch) => {
        api.fetchUser(userId, function (success, data, error) {
            if (success) {
                dispatch({type: t.USER_FETCHED, data: data});
                successCB();
            }
            else if (error) errorCB(error)
        });
    };
}

export function searchUsers(searchTerm, successCB, errorCB) {
    return (dispatch) => {
        api.searchUsers(searchTerm, function (success, data, error) {
            if (success) {
                dispatch({type: t.USERS_FETCHED, data: data});
                successCB(data);
            }
            else if (error) errorCB(error)
        });
    };
}

export function searchEvents(searchTerm, successCB, errorCB) {
    return (dispatch) => {
        api.searchEvents(searchTerm, function (success, data, error) {
            if (success) {
                dispatch({type: eventT.EVENTS_FETCHED, data: data});
                successCB(data);
            }
            else if (error) errorCB(error)
        });
    };
}

export function search(searchTerm, successCB, errorCB) {
    return (dispatch) => {
        api.search(searchTerm, function (success, data, error) {
            if (success) {

                if (data.users) {
                    dispatch({type: t.USERS_FETCHED, data: data.users});
                }
                if (data.events) {
                    dispatch({type: eventT.EVENTS_FETCHED, data: data.events});
                }
                if (data.tags) {
                    dispatch({type: tagT.TAGS_FETCHED, data: data.tags});
                }

                successCB(data);

            }
            else if (error) errorCB(error)
        });
    };
}

export function getProfileImage(userId, successCB, errorCB) {
    return (dispatch) => {
        let imageKey = `profilePictures/${userId}`;
        cache.getItem(imageKey, function(err, data) {
            // Item not in cache -> fetch profile picture manually
            if (err === undefined) {
                // If in queue, wait for it to be set and fetch it
                if (cache.isKeyInQueue(imageKey)) {
                    console.log('key is in queue');
                    cache.on(imageKey, 'keySet', function (key, data) {
                        console.log('key is set');
                        successCB(data);
                    });
                }
                else {
                    cache.enqueueKey(imageKey);
                    api.getProfilePic(userId, function (success, data, error) {
                        if (success) {
                            cache.setItem(`profilePictures/${userId}`, data, function (err) {
                                if (err) {
                                    // Cache failed
                                    console.log(err);
                                }
                            });
                            successCB(data);
                        }
                        else {
                            errorCB(error);
                        }
                    });
                }
            }
            // Item is in cache -> pass back the item
            else if (data !== undefined) {
                successCB(data);
            }
        });
    };
}


// Give back data in the form of {userId: <profile data>}
export function getProfileImages(userIds, successCB, errorCB) {
    return (dispatch) => {
        let results = {};
        let needsFetched = [];

        let completion = () => {
            if (needsFetched.length === 0) {
                successCB(results);
            }
            else {
                api.getProfilePics(needsFetched, function (success, data, error) {
                    if (success) {
                        let merged = {...results, ...data};
                        successCB(merged);
                    }
                    else {
                        // Still executing the successCB for whatever results that were fetched
                        // from cache
                        successCB(results);
                        errorCB(error);
                    }
                });
            }
        };

        let count = 0;
        userIds.forEach(userId => {
            cache.getItem(`profilePictures/${userId}`, function(success, data, error) {
                if (success) {
                    results[userId] = data;
                }
                else {
                    needsFetched.push(userId);
                }
                count++;
                if (count === userIds.length) {
                    completion();
                }
            });
        });

    }
}
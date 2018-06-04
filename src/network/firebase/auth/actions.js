import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../../config/firebase";
import {cache} from '../../../config/cache';

import {AsyncStorage} from 'react-native';
import {DEFAULT_USER_SETTINGS} from "../../../config/constants";

export function register(data, successCB, errorCB) {
    return (dispatch) => {
        api.register(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function createUser(user, successCB, errorCB) {
    return (dispatch) => {
        api.createUser(user, function (success, data, error) {
            if (success) {
                dispatch({
                    type: t.LOGGED_IN,
                    data: {
                        user,
                        settings: DEFAULT_USER_SETTINGS
                    }
                });
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function updateSettings(settings, successCB, errorCB) {
    return (dispatch) => {
        dispatch({
            type: t.SETTINGS_UPDATED,
            data: settings
        });

    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        api.login(data, function (success, data, error) {
            if (success) {
                if (data.exists) {
                    dispatch({
                        type: t.LOGGED_IN,
                        data: {
                            user: data.user,
                            settings: data.settings
                        }
                    });
                }
                successCB(data);
            } else if (error) errorCB(error)
        });
    };
}

export function persistCurrentUser(successCB, errorCB) {
    let user = auth.currentUser;

    return (dispatch) => {
        console.log('i am persisting');
        api.persistUser(user, function (success, data, error) {
            if (success) {
                if (data.exists) dispatch({type: t.USER_UPDATED, data: data.user});
                successCB(data);
            } else if (error) errorCB(error)
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(settings, successCB, errorCB) {
    let user = auth.currentUser;

    return (dispatch) => {
        api.signOut(user, settings, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);

            if (isLoggedIn) {
                //get the user object from the Async storage
                AsyncStorage.getItem('user', (err, user) => {
                    console.log(user);
                    if (user === null) isLoggedIn = false; //set the loggedIn value to false
                    else {
                        AsyncStorage.getItem('settings', (err, settings) => {

                            if(settings === null){
                                settings = DEFAULT_USER_SETTINGS;
                            }

                            dispatch({
                                type: t.LOGGED_IN, data: {
                                    user: JSON.parse(user),
                                    settings: JSON.parse(settings)
                                }
                            });
                        });
                    }

                    callback(isLoggedIn);
                });

            } else {
                dispatch({type: t.LOGGED_OUT});
                callback(isLoggedIn);
            }
        });
    };
}

export function oauthLogin(type, successCB, errorCB) {
    return (dispatch) => {
        api.oauthLogin(type, function (success, data, error) {
            if (success) {
                dispatch({
                    type: t.LOGGED_IN,
                    data: {
                        user: data.user,
                        settings: data.settings
                    }
                });
                successCB(data);
            }
            else if (error) {
                errorCB(error);
            }
        });
    };
}
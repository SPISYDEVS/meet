import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/auth/actionTypes';

let initialState = {isLoggedIn: false, user: {}, settings: {}};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGGED_IN: {

            const user = action.data.user;
            const settings = action.data.settings;

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)], ['settings', JSON.stringify(settings)]
            ]);

            return {
                ...state,
                isLoggedIn: true,
                user: user,
                settings: settings
            };
        }
        case t.USER_UPDATED: {
            const user = action.data;

            state = Object.assign({}, state, {isLoggedIn: true, user: user});

            return state;
        }
        case t.SETTINGS_UPDATED: {
            const settings = action.data;

            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...settings
                }
            };
        }
        case t.LOGGED_OUT: {
            let keys = ['user', 'settings'];
            AsyncStorage.multiRemove(keys);

            state = Object.assign({}, state, {isLoggedIn: false, user: {}});

            return {
                ...state,
                isLoggedIn: false,
                user: {},
                settings: {},
            };
        }
        // case eventT.PROFILE_UPDATED: {
        //     const user = action.data;
        //
        //     // Save token and data to Asyncstorage
        //     AsyncStorage.multiSet([
        //         ['user', JSON.stringify(user)]
        //     ]);
        //
        //     return {
        //         ...state,
        //         user: user
        //     };
        // }
        // case peopleT.FRIEND_REQUEST_SENT: {
        //     const {requestedFriendId} = action.data;
        //
        //     const user = state.user;
        //
        //     //update friends for user
        //     if(user['friends'] === undefined){
        //         user['friends'] = {};
        //     } else if (requestedFriendId in user['friends']) {
        //         return state;
        //     }
        //
        //     user['friends'][requestedFriendId] = false;
        //
        //     return {
        //         ...state,
        //         user: user
        //     }
        // }
        default:
            return state;
    }
};

export default authReducer;
import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/auth/actionTypes';

let initialState = {isLoggedIn: false, user: null};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGGED_IN: {
            const user = action.data;

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);

            state = Object.assign({}, state, {isLoggedIn: true, user: user});

            return state;
        }
        case t.USER_UPDATED: {
            const user = action.data;

            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);

            state = Object.assign({}, state, {isLoggedIn: true, user: user});

            return state;
        }
        case t.LOGGED_OUT: {
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            state = Object.assign({}, state, {isLoggedIn: false, user: null});

            return state;
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
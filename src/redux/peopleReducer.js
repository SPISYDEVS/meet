import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/user/actionTypes';
import * as authT from "../network/firebase/auth/actionTypes";

let initialState = {byId: {}, allIds: []};

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.USERS_FETCHED: {
            const users = action.data;
            const userIds = Object.keys(users);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...users
                },
                allIds: [...state.allIds].concat(userIds.filter(id => !state.allIds.includes(id))),
            }
        }
        case authT.LOGGED_IN: {
            const user = action.data;

            const newIds = [...state.allIds];

            if(!newIds.includes(user.uid)){
                newIds.push(user.uid);
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [user.uid]: user
                },
                allIds: newIds,
            }
        }
        case authT.LOGGED_OUT: {
            return {byId: {}, allIds: []};
        }
        default:
            return state;
    }
};

export default peopleReducer;
import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';
import * as authT from "../auth/actionTypes";

let initialState = {byId: {}, allIds: [], friendIds: [], requestIds: []};

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
        case authT.LOGGED_OUT: {
            return {byId: {}, allIds: []};
        }
        default:
            return state;
    }
};

export default peopleReducer;
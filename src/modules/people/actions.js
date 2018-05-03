import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../config/firebase";

import {AsyncStorage} from 'react-native';

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

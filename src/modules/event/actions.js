import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../config/firebase";

import {AsyncStorage} from 'react-native';

export function createEvent(event, successCB, errorCB) {
    return (dispatch) => {
            api.createEvent(event, auth.currentUser, function (success, data, error) {
                if (success) {
                    event['id'] = data;
                    dispatch({type: t.EVENT_CREATED, data: event});
                    successCB();
                } else if (error) errorCB(error)
            });
    };
}
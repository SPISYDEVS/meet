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

export function loadEvents(eventIds, successCB, errorCB) {
    return (dispatch) => {
            api.loadEvents(eventIds, function (success, data, error) {
                if (success) {
                    dispatch({type: t.MY_EVENTS_LOADED, data: data});
                    successCB();
                } else if (error) errorCB(error)
            });
    };
}
import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../config/firebase";

import {AsyncStorage} from 'react-native';

export function fetchFeed(location, successCB, errorCB) {

    return (dispatch) => {
        api.fetchFeed(location, function (success, data, error) {
            if (success) {
                dispatch({type: t.FEED_FETCHED, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function updateLocation(location) {
    return (dispatch) => {
        dispatch({type: t.LOCATION_FETCHED, data: location});
    };
}

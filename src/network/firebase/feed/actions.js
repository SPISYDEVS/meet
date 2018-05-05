import * as t from './actionTypes';
import * as eventT from '../event/actionTypes';
import * as api from './api';


export function fetchFeed(location, successCB, errorCB) {

    return (dispatch) => {
        api.fetchFeed(location, function (success, data, error) {
            if (success) {
                dispatch({type: eventT.EVENTS_FETCHED, data: data});
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

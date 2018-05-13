import * as t from './actionTypes';
import * as eventT from '../event/actionTypes';
import * as peopleT from '../user/actionTypes';
import * as api from './api';
import * as peopleApi from '../user/api';


export function fetchFeed(location, successCB, errorCB) {

    return (dispatch) => {
        api.fetchFeed(location, function (success, events, error) {
            if (success) {

                dispatch({type: eventT.EVENTS_FETCHED, data: data.events});
                dispatch({type: peopleT.USERS_FETCHED, data: data.hosts});

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

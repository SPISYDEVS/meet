import * as t from './actionTypes';
import * as eventT from '../event/actionTypes';
import * as peopleT from '../user/actionTypes';
import * as api from './api';
import * as peopleApi from '../user/api';


export function fetchFeed(location, successCB, errorCB) {

    return (dispatch) => {
        api.fetchFeed(location, function (success, data, error) {
            if (success) {

                if (data === undefined) {
                    successCB({
                        events: {}
                    });
                } else {
                    dispatch({type: eventT.EVENTS_FETCHED, data: data.events});
                    dispatch({type: peopleT.USERS_FETCHED, data: data.hosts});
                    successCB(data);
                }

            } else if (error) errorCB(error)
        });
    };
}

export function updateLocation(location) {
    return (dispatch) => {
        dispatch({type: t.LOCATION_FETCHED, data: location});
    };
}

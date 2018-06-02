import * as api from './api';
import * as eventT from '../event/actionTypes';


export function updateTagWithEvent(tag, eventId, successCB, errorCB) {
    return (dispatch) => {
        api.updateTagWithEvent(tag, eventId, function (success, data, error) {
            if (success) {
                successCB(data);
            }
            else if (error) {
                errorCB(error);
            }
        })
    };
}


export function fetchTagEvents(tag, successCB, errorCB) {
    return (dispatch) => {
        api.fetchTagEvents(tag, function (success, data, error) {
            if (success) {

                if (data !== undefined) {
                    dispatch({type: eventT.EVENTS_FETCHED, data: data.events});
                } else {
                    data = {events: {}};
                }

                successCB(data);

            }
            else if (error) {
                errorCB(error);
            }
        });
    }
}
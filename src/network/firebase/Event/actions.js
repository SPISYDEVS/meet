import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../../config/firebase";


export function createEvent(event, user, successCB, errorCB) {

    event['hostId'] = user.uid;
    event['hostName'] = user.firstName + " " + user.lastName;

    return (dispatch) => {
        api.createEvent(event, user, function (success, data, error) {
            if (success) {
                event['id'] = data;
                dispatch({type: t.EVENT_CREATED, data: event});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function fetchMyEvents(eventIds, successCB, errorCB) {
    return (dispatch) => {
        api.fetchMyEvents(eventIds, function (success, data, error) {
            if (success) {
                dispatch({type: t.MY_EVENTS_LOADED, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function rsvpEvent(eventId, successCB, errorCB) {

    const user = auth.currentUser;

    return (dispatch) => {
        api.rsvpEvent(eventId, user, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_RSVP, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}
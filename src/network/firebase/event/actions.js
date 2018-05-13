import * as t from './actionTypes';
import * as peopleT from '../user/actionTypes';
import * as api from './api';
import {auth} from "../../../config/firebase";


export function createEvent(event, user, successCB, errorCB) {

    event['hostId'] = user.uid;

    //compliant to database schema (object instead of list)
    const invitations = event['invitations'];
    event['invitations'] = {};
    invitations.forEach(id => event['invitations'][id] = true);

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

export function fetchEvents(eventIds, successCB, errorCB) {
    return (dispatch) => {
        api.fetchEvents(eventIds, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENTS_FETCHED, data: data.events});
                dispatch({type: peopleT.USERS_FETCHED, data: data.hosts});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function fetchEvent(eventId, successCB, errorCB) {
    return (dispatch) => {
        api.fetchEvent(eventId, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_FETCHED, data: data.event});
                dispatch({type: peopleT.USER_FETCHED, data: data.host});
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

export function respondToEventInvitation(eventId, accept, successCB, errorCB) {
    return (dispatch) => {
        api.respondToEventInvitation(eventId, accept, function (success, data, error) {
            if (success) {
                // dispatch({type: t.EVENT_RSVP, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

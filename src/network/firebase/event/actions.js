import * as t from './actionTypes';
import * as peopleT from '../user/actionTypes';
import * as api from './api';
import {auth} from "../../../config/firebase";
import moment from "moment";

export function createEvent(event, user, successCB, errorCB) {

    event['hostId'] = user.uid;

    //compliant to database schema (object instead of list)
    const invitations = event['invitations'];
    event['invitations'] = {};
    invitations.forEach(id => event['invitations'][id] = true);

    const tags = event['tags'];
    event['tags'] = {};
    tags.forEach(tag => event['tags'][tag] = true);

    return (dispatch) => {
        api.createEvent(event, user, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_CREATED, data: {event: event, eventId: data}});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function editEvent(event, user, eventId, successCB, errorCB) {

    event['hostId'] = user.uid;

    //compliant to database schema (object instead of list)
    const invitations = event['invitations'];
    event['invitations'] = {};
    invitations.forEach(id => event['invitations'][id] = true);

    const tags = event['tags'];
    event['tags'] = {};
    tags.forEach(tag => event['tags'][tag] = true);

    return (dispatch) => {
        api.editEvent(event, eventId, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_CREATED, data: {event: event, eventId: data}});
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

export function fetchEventComments(eventId, successCB, errorCB) {

    return (dispatch) => {
        api.fetchEventComments(eventId, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_COMMENTS_FETCHED, data: {eventId: eventId, comments:data}});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function commentOnEvent(eventId, comment, successCB, errorCB) {

    const user = auth.currentUser;

    const commentObj = {
        userId: user.uid,
        comment: comment,
        timestamp: moment.utc().valueOf()
    };

    return (dispatch) => {
        api.commentOnEvent(eventId, commentObj, function (success, data, error) {
            if (success) {
                // dispatch({type: t.COMMENT_ON_EVENT, data: {eventId: eventId, comment:data}});
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

export function cancelRsvpEvent(eventId, successCB, errorCB) {

    const user = auth.currentUser;

    return (dispatch) => {
        api.cancelRsvpEvent(eventId, user, function (success, data, error) {
            if (success) {
                dispatch({type: t.CANCEL_EVENT_RSVP, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}

export function checkInToEvent(eventId, successCB, errorCB) {

    return (dispatch) => {
        api.checkInToEvent(eventId, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_FETCHED, data: data});
                successCB();
            } else if (error) errorCB(error)
        });
    };
}
export function checkOutOfEvent(eventId, successCB, errorCB) {

    return (dispatch) => {
        api.checkOutOfEvent(eventId, function (success, data, error) {
            if (success) {
                dispatch({type: t.EVENT_FETCHED, data: data});
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

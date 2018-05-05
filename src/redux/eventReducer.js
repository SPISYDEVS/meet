import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/Event/actionTypes';
import * as authT from '../network/firebase/Auth/actionTypes';
import * as feedT from '../network/firebase/Feed/actionTypes';

let initialState = {byId: {}, allIds: []};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.EVENT_CREATED: {
            const event = action.data;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [event.id]: event
                },
                allIds: [...state.allIds, event.id],
            };
        }
        case t.MY_EVENTS_LOADED: {
            const events = action.data;
            const eventIds = Object.keys(events);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...events
                },
                allIds: [...state.allIds].concat(eventIds.filter(id => !state.allIds.includes(id))),
            }
        }
        case t.EVENT_RSVP: {

            //expect object with keys plannedAttendees and eventId
            const {plannedAttendees, eventId} = action.data;
            const event = state.byId[eventId];

            //update the event plannedAttendees with the new data
            if (event.plannedAttendees !== undefined) {
                event.plannedAttendees = {
                    ...event.plannedAttendees,
                    ...plannedAttendees
                }
            } else {
                event.plannedAttendees = plannedAttendees;
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [eventId]: event
                }
            }
        }
        case feedT.FEED_FETCHED: {
            const events = action.data;
            const eventIds = Object.keys(events);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...events
                },
                allIds: [...state.allIds].concat(eventIds.filter(id => !state.allIds.includes(id))),
            }
        }
        case authT.LOGGED_OUT: {
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            return {byId: {}, allIds: [], myIds: []};
        }

        default:
            return state;
    }
};

export default eventReducer;
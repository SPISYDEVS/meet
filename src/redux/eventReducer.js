import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/event/actionTypes';
import * as authT from '../network/firebase/auth/actionTypes';

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
        case t.EVENTS_FETCHED: {
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
        case authT.LOGGED_OUT: {
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            return {byId: {}, allIds: [], myIds: []};
        }
        case t.HOST_OBJ_FETCHED: {
            const user = action.data;
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);
            state = Object.assign({}, state, {eventUser: user});
            return state;
        }

        default:
            return state;
    }
};

export default eventReducer;
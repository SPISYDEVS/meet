import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';

let initialState = {byId: {}, allIds: []};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.EVENT_CREATED:
            const event = action.data;

            // Save token and data to Asyncstorage
            // AsyncStorage.multiSet([
            //     ['user', JSON.stringify(user)]
            // ]);

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [event.id]: event
                },
                allIds: [...state.allIds, event.id]
            };

        default:
            return state;
    }
};

export default eventReducer;
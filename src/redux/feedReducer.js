import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/feed/actionTypes';

let initialState = {location: {latitude: 0, longitude: 0}};

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOCATION_FETCHED: {
            return {
                ...state,
                location: action.data,
            }
        }
        default:
            return state;
    }
};

export default feedReducer;
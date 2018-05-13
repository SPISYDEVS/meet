import {AsyncStorage} from 'react-native';

import * as t from '../network/firebase/actionTypes';

let initialState = {feedKey: null};

const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.UPDATE_FEED_PAGE_KEY: {
            return {
                ...state,
                feedKey: action.data
            }
        }
        default:
            return state;
    }
};

export default paginationReducer;
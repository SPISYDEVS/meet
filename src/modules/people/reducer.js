import {AsyncStorage} from 'react-native';

import * as t from './actionTypes';
import * as eventT from '../event/actionTypes';
import * as homeT from '../home/actionTypes';

let initialState = {people: {}};

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case eventT.MY_EVENTS_LOADED:{
            return {

            }
        }
        default:
            return state;
    }
};

export default peopleReducer;
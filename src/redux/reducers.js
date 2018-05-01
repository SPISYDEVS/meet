import {reducer as authReducer} from "../modules/auth";
import {reducer as eventReducer} from "../modules/event";
import {reducer as homeReducer} from "../modules/home";

const rehydrated = (state = false, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            return true;
        default:
            return state;
    }
};

export default {
    rehydrated,
    authReducer,
    eventReducer,
    homeReducer
};

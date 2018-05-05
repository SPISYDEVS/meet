import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import homeReducer from "./feedReducer";
import peopleReducer from "./peopleReducer";


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
    peopleReducer,
    authReducer,
    eventReducer,
    homeReducer
};
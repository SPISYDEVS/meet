import authReducer from "../network/firebase/Auth/reducer";
import eventReducer from "../network/firebase/Event/reducer";
import homeReducer from "../network/firebase/Feed/reducer";
import peopleReducer from "../network/firebase/User/reducer";

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

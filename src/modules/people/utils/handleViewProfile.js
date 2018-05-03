import {Actions} from 'react-native-router-flux';
import {auth} from "../../../config/firebase";

export default viewProfile = (userId) => {
    if (userId === auth.currentUser.uid) {
        Actions.Profile();
    } else {
        Actions.push('SomeonesProfile', {userId: userId});
    }
};
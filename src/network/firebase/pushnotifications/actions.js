import * as api from './api';


export function savePushToken(userId, token, successCB, errorCB) {
    return (dispatch) => {
        api.createPushToken(userId, token, function(success, data, error) {
            if (success) {
                successCB(data);
            }
            else if (error) {
                errorCB(error);
            }
        })
    };
}
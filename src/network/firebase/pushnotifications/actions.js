import * as api from './api';


export function savePushToken(userId, token, successCB, errorCB) {
    return (dispatch) => {
        api.createPushToken(userId, token, function(success, data, error) {
            if (success) {
                // Data here is just the push notification token
                successCB(data);
            }
            else if (error) {
                errorCB(error);
            }
        })
    };
}

export function sendPushNotification(userIds, title, body, successCB, errorCB) {

    userIds = userIds.join(',');

    return (dispatch) => {
        api.sendPushNotification(userIds, title, body, function(success, data, error) {
            if (success) {
                successCB(data);
            }
            else if (error) {
                errorCB(error);
            }
        })
    };
}
import {database} from "../../../config/firebase";
import {SERVER_URL} from "../../../config/constants";
import axios from 'axios';
import querystring from 'querystring';


export function createPushToken(userId, token, callback) {
    database.ref('pushTokens').child(`${userId}/tokens`).update({
        [token]: true
    }).then(() => {
        callback(true, token, null);
    }).catch(error => {
        callback(false, null, {message: error});
    })
}


export function sendPushNotification(userIds, title, body, callback) {
    axios.post(SERVER_URL + 'api/push/send', querystring.stringify({
            'userIds': userIds,
            'title': title,
            'body': body
    }))
        .then(response => {
        callback(true, response, null);
    })
        .catch(error => {
        callback(false, null, {message: error});
    })
}
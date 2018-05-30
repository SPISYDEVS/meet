import {database} from "../../../config/firebase";


export function createPushToken(userId, token, callback) {
    database.ref('pushTokens').child(`${userId}/tokens`).update({
        [token]: true
    }).then(() => {
        callback(true, token, null);
    }).catch(error => {
        callback(false, null, {message: error});
    })
}
import {database} from "../../../config/firebase";


export function updateTagWithEvent(tag, eventId, callback) {
    database.ref('tags').child(`${tag}/events`).update({
        [eventId]: true
    }).then(() => {
        callback(true, tag, null);
    }).catch(error => {
        callback(false, null, {message: error});
    })
}
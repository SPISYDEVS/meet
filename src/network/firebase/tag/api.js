import {database} from "../../../config/firebase";
import {SERVER_URL} from "../../../config/constants";
import axios from 'axios';


export function updateTagWithEvent(tag, eventId, callback) {
    database.ref('tags').child(`${tag}/events`).update({
        [eventId]: true
    }).then(() => {
        callback(true, tag, null);
    }).catch(error => {
        callback(false, null, {message: error});
    });
}


export function fetchTagEvents(tag, callback) {
    axios.get(SERVER_URL + `api/tags/${tag}`, {})
        .then(function(res) {
            console.log(res);
            callback(true, res.data.data, null);
        })
        .catch(function(err) {
            callback(false, null, {message:err});
        });
}
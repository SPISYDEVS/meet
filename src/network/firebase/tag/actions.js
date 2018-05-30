import * as api from './api';


export function updateTagWithEvent(tag, eventId, successCB, errorCB) {
    return (dispatch) => {
        api.updateTagWithEvent(tag, eventId, function(success, data, error) {
            if (success) {
                successCB(data);
            }
            else if (error) {
                errorCB(error);
            }
        })
    };
}
import {GOOGLE_MAPS_API_KEY} from "../../config/constants";
import {googleURI} from "./constants";


const queryString = require('query-string');


export function reverseGeocode (lat, lng, successCB, errorCB) {
    let params = {
        key: GOOGLE_MAPS_API_KEY,
        latlng: `${lat},${lng}`,
    };

    let qs = queryString.stringify(params);

    fetch(
        `${googleURI}/geocode/json?${qs}`)
        .then((res) => res.json())
        .then((json) => {
            if (json.status !== 'OK') {
                errorCB(new Error(`Geocode error: ${json.status}`));
            }
            else {
                // retrieve the first result and assign it to the address property
                // ('other' stores everything that value doesn't in a form field)
                successCB(json.results[0].formatted_address);
            }
        });
}

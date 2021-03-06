import axios from 'axios';
import {SERVER_URL} from "../../../config/constants";

export function fetchFeed(location, fetchingDistance, callback){

    //miles to meters
    fetchingDistance = fetchingDistance * 1.60934;

    axios.get(SERVER_URL + 'api/events/feed',
        {
            params: {
                radius: fetchingDistance,
                daysFromNow: 10,
                lat: location.latitude,
                lng: location.longitude,
            }
        }
    ).then((response) => {
        callback(true, response.data.data, null);
    }).catch(error => callback(false, null, error));

}

//Create the event object in realtime database
// export function fetchFeed(location, callback) {
//
//     //specify location + radius to query by
//     const geoQuery = geofireRef.query({
//         center: location,
//         radius: 500000
//     });
//
//     const eventIds = [];
//
//     const onKeyEnteredRegistration = geoQuery.on("key_entered", function (key, location, distance) {
//         eventIds.push(key);
//     });
//
//     geoQuery.on("ready", function () {
//
//         Promise.all(eventIds.map(id => {
//             return database.ref('events').child(id).once('value');
//         }))
//             .then(events => {
//                 const eventObject = {};
//                 let userIds = [];
//
//                 events.forEach(event => {
//                     eventObject[event.key] = event.val();
//                     userIds.push(event.val().hostId);
//                 });
//
//                 Promise.all(userIds.map(id => {
//                     return database.ref('users').child(id).once('value');
//                 }))
//                     .then(users => {
//                         const userObject = {};
//                         users.forEach(user => userObject[user.key] = user.val());
//
//                         const data = {
//                             events: eventObject,
//                             hosts: userObject
//                         };
//
//                         callback(true, data, null)
//
//                     })
//                     .catch((error) => {
//                         callback(false, null, {message: error})
//                     });
//
//             })
//             .catch((error) => {
//                 callback(false, null, {message: error})
//             });
//
//
//         // This will fire once the initial data is loaded, so now we can cancel the "key_entered" event listener
//         onKeyEnteredRegistration.cancel();
//     });
//
// }
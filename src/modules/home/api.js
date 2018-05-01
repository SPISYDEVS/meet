import {auth, database, provider, geofireRef} from "../../config/firebase";

//Create the event object in realtime database
export function fetchFeed(location, callback) {

    //specify location + radius to query by
    const geoQuery = geofireRef.query({
        center: location,
        radius: 50000
    });

    //geo registration variable can be used to cancel location updates
    //'key_entered' used to retrieve all keys that enter the query criteria
    const onKeyEnteredRegistration = geoQuery.on("key_entered", function (key, location, distance) {

        database.ref('events').child(key).once('value').then((snapshot) => {
            callback(true, {[snapshot.key]: snapshot.val()}, null);
        }).catch((error) => {
            console.log(error);
            callback(false, null, {message: error})
        });

    });

    onKeyEnteredRegistration.cancel();


}

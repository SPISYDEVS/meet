import React from 'react';
import {Constants, Location, Permissions} from 'expo';

import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth} from "../../../auth/index"
import {actions as home} from "../../index"
import Event from "../../../event/components/Event/Event";
import moment from "moment";
import haversine from "haversine";
import {ScrollView, StyleSheet, Alert, Platform} from "react-native";

const {fetchFeed, updateLocation} = home;
const {signOut} = auth;

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        homeReducer: state.homeReducer,
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("IT DIDN'T WORK");
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log("Permission not granted");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        this.props.updateLocation({latitude: lat, longitude: lng});

        this.props.fetchFeed([lat, lng], () => {
        }, () => {
        });
    };

    render() {

        const userLocation = this.props.homeReducer.location;
        const eventIds = this.props.eventReducer.allIds;
        const events = this.props.eventReducer.byId;

        return (
            <ScrollView style={styles.container}>
                {eventIds.map((id) => {

                    //pull the values with the keys 'title', 'description', ...
                    const {title, description, date, userId, location, address} = events[id];

                    //gets the distance between the user and the location of an event, truncates to 1 decimal place
                    const distance = haversine(location, userLocation, {unit: 'mile'}).toFixed(1);

                    const formattedDate = moment(date, 'MMMM Do YYYY, h:mm a').calendar();

                    return <Event
                        key={id}
                        title={title}
                        description={description}
                        date={formattedDate}
                        distance={distance}
                        address={address}
                        hostName={userId}/>
                })}
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, {signOut, fetchFeed, updateLocation})(Home);
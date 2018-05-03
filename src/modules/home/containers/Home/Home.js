import React from 'react';
import {Constants, Location, Permissions} from 'expo';

import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth} from "../../../auth/index"
import {actions as home} from "../../index"
import {actions as event} from "../../../event/index";
import {actions as people} from "../../../people/index";
import Event from "../../../event/components/Event/Event";
import moment from "moment";
import haversine from "haversine";
import {momentFromDate} from "../../../../components/utils/dateUtils";
import {ScrollView, StyleSheet, Alert, Platform} from "react-native";

const {fetchFeed, updateLocation} = home;
const {signOut, persistUser} = auth;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.props.signOut();
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("IT DIDN'T WORK");
        } else {
            this._getLocationAsync();
        }
    }

    componentDidMount() {
        this.props.persistUser(this.props.user, () => {
        }, () => {
        });
    };

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log("Permission not granted");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        //update location in store
        this.props.updateLocation({latitude: lat, longitude: lng});

        //load events into store
        this.props.fetchFeed([lat, lng], () => {
        }, () => {
        })
    };


    render() {

        const userLocation = this.props.homeReducer.location;
        const eventIds = this.props.eventReducer.allIds;
        const events = this.props.eventReducer.byId;

        //only select from events with dates later than "now"
        const now = Date.now();
        const filteredEventIds = eventIds.filter(id => now < events[id].date);

        //from the remaining events, get the ones with dates closest to "now"
        filteredEventIds.sort(function (a, b) {
            return events[a].date - events[b].date;
        });

        return (
            <ScrollView style={styles.container}>
                {filteredEventIds.map((id) => {

                    //pull the values with the keys 'title', 'description', etc... from the corresponding event
                    const {title, description, date, hostName, hostId, location, address, plannedAttendees} = events[id];

                    let listOfPlannedAttendees = [];

                    if (plannedAttendees !== undefined) {
                        listOfPlannedAttendees = Object.keys(plannedAttendees);
                    }

                    //gets the distance between the user and the location of an event, truncates to 1 decimal place
                    const distance = haversine(location, userLocation, {unit: 'mile'}).toFixed(1);

                    const formattedDate = moment(date).calendar();

                    return <Event
                        key={id}
                        title={title}
                        description={description}
                        date={formattedDate}
                        distance={distance}
                        address={address}
                        hostName={hostName}
                        plannedAttendees={listOfPlannedAttendees}
                        hostId={hostId}
                        eventId={id}
                    />
                })}
            </ScrollView>
        );
    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        homeReducer: state.homeReducer,
        user: state.authReducer.user
    }
};

//allows the component to use actions as props
const actions = {
    fetchFeed,
    updateLocation,
    signOut,
    persistUser
};

export default connect(mapStateToProps, actions)(Home);
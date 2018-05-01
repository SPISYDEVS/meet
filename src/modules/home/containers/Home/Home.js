import React from 'react';
import {Constants, Location, Permissions} from 'expo';

import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth} from "../../../auth/index"
import {actions as home} from "../../index"
import Event from "../../../event/components/Event/Event";
import moment from "moment";

const {ScrollView, StyleSheet, Alert, Platform} = require('react-native');

const {fetchFeed} = home;
const {signOut} = auth;

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer
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
        this.props.fetchFeed([lat, lng], () => {
        }, () => {
        });
    };

    render() {

        const eventIds = this.props.eventReducer.allIds;
        const events = this.props.eventReducer.byId;


        return (
            <ScrollView style={styles.container}>
                {eventIds.map((id) => {

                    const {title, description, date, userId} = events[id];
                    const formattedDate = moment(date, 'MMMM Do YYYY, h:mm a').calendar();

                    return <Event
                        key={id}
                        title={title}
                        description={description}
                        date={formattedDate}
                        hostName={userId}/>
                })}
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, {signOut, fetchFeed})(Home);
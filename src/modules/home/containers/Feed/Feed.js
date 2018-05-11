import React from 'react';
import {Constants, Location, Permissions} from 'expo';

import {connect} from 'react-redux';
import {Platform} from "react-native";

import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import {fetchFeed, updateLocation} from '../../../../network/firebase/feed/actions';
import EventListView from "../../../event/components/EventListView/EventListView";
import {fetchUsers} from "../../../../network/firebase/user/actions";

class Feed extends React.Component {
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
        this.props.persistCurrentUser(() => {
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

            //fetches the hosts from each event to pass in to the dumb component Event
            this.props.eventReducer.allIds.forEach(eventId => {

                let usersToFetch = [];

                const event = this.props.eventReducer.byId[eventId];

                const userId = event.hostId;

                if (!(userId in this.props.peopleReducer.byId)) {
                    usersToFetch.push(userId);
                }

                if (usersToFetch.length > 0) {
                    this.props.fetchUsers(usersToFetch, () => {
                    }, () => {
                    });
                }

            });

        }, () => {
        })
    };


     render() {

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
            <EventListView eventIds={filteredEventIds}/>
        );
    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        homeReducer: state.homeReducer,
        peopleReducer: state.peopleReducer,
        user: state.authReducer.user
    }
};

//allows the component to use actions as props
const actions = {
    fetchFeed,
    updateLocation,
    signOut,
    fetchUsers,
    persistCurrentUser
};

export default connect(mapStateToProps, actions)(Feed);
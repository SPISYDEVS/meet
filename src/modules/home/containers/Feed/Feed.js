import React from 'react';
import {Constants, Location, Permissions} from 'expo';

import {connect} from 'react-redux';
import {ActivityIndicator, Platform, SafeAreaView, Text, View} from "react-native";

import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import {fetchFeed, updateLocation} from '../../../../network/firebase/feed/actions';
import EventListView from "../../../event/components/EventListView/EventListView";
import {fetchUsers} from "../../../../network/firebase/user/actions";
import styles from "./styles";
import commonStyles from "../../../../styles/commonStyles";

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("IT DIDN'T WORK");
        } else {
            this._getLocationAsync().then(() => {
                this.fetchFeed()
            });
        }
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

        // //load events into store
        // this.props.fetchFeed([lat, lng], () => {
        //     this.setState({dataLoaded: true});
        // }, (error) => {
        //     console.log(error);
        // })
    };

    fetchFeed = () => {
        const location = this.props.feedReducer.location;
        const {latitude, longitude} = location;

        //load events into store
        this.props.fetchFeed([latitude, longitude], () => {
            this.setState({dataLoaded: true})
        }, (error) => {
            console.log(error);
        })
    };

    render() {

        if (!this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        const eventIds = this.props.eventReducer.allIds;
        const events = this.props.eventReducer.byId;

        //only select from events with dates later than "now"
        const now = Date.now();
        const filteredEventIds = eventIds.filter(id => now < events[id].startDate);
        console.log(filteredEventIds);

        //from the remaining events, get the ones with dates closest to "now"
        filteredEventIds.sort(function (a, b) {
            return events[a].startDate - events[b].startDate;
        });

        console.log(filteredEventIds);
        const hasEvents = filteredEventIds.length > 0;

        return (
            <SafeAreaView style={styles.container}>
                {!hasEvents &&
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>There's no events, you stupid loser</Text>
                </View>
                }
                <EventListView eventIds={filteredEventIds} onRefresh={this.fetchFeed}/>
            </SafeAreaView>
        );

    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        feedReducer: state.feedReducer,
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
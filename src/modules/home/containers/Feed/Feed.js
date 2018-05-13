import React from 'react';
import {Constants, Location, Permissions} from 'expo';

import {connect} from 'react-redux';
import {ActivityIndicator, Platform, SafeAreaView, Text, View} from "react-native";
import {Actions} from 'react-native-router-flux';

import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import {fetchFeed, updateLocation} from '../../../../network/firebase/feed/actions';
import EventListView from "../../../event/components/EventListView/EventListView";
import {fetchUsers} from "../../../../network/firebase/user/actions";
import styles from "./styles";
import {Icon} from "react-native-elements";

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        }
    }

    componentWillMount() {
        // this.props.signOut();

    }

    componentDidMount() {
        this.props.persistCurrentUser(() => {
        }, () => {
        });

        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("IT DIDN'T WORK");
        } else {
            this._getLocationAsync();
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

        //load events into store
        this.props.fetchFeed([lat, lng], () => {
            this.setState({dataLoaded: true});
        }, (error) => {
            console.log(error);
        })
    };

    fetchFeed = () => {
        const location = this.props.feedReducer.location;
        const {latitude, longitude} = location;

        //load events into store
        this.props.fetchFeed([latitude, longitude], () => {
        }, (error) => {
            console.log(error);
        })
    };

    render() {

        if (!this.state.dataLoaded) {
            return <View style={styles.container}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

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
            <SafeAreaView style={styles.container}>

                <View style={styles.cappedContainer}>

                    <View style={[styles.padded, styles.rowContainer]}>
                        <Text style={styles.headerText}>Feed</Text>

                        <Icon name="search" size={35} color={"white"} onPress={() => Actions.push('EventSearch')}/>
                    </View>

                </View>

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
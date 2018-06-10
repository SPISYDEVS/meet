import React from 'react';

import {connect} from 'react-redux';
import {SafeAreaView, View} from "react-native";
import {Location, Permissions, Notifications} from 'expo';
import {auth as firebaseAuth} from "../../../../config/firebase";

import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import styles from "./styles";
import commonStyles from "../../../../styles/commonStyles";
import ExploreSearch from "../ExploreSearch/ExploreSearch";
import Feed from "../Feed/Feed";
import {updateLocation} from "../../../../network/firebase/feed/actions";
import haversine from "haversine";
import {checkInToEvent, checkOutOfEvent, fetchEvents} from "../../../../network/firebase/event/actions";
import moment from "moment";
import {savePushToken} from "../../../../network/firebase/pushnotifications/actions";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMode: false,
            notification: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    };

    componentDidMount() {
        // this.props.signOut();

        // Save push notification token in firebase
        Notifications.addListener(this._handleNotification);

        this.getNotificationPerm();

        this.props.persistCurrentUser(() => {
            this.initializeCheckInFunctionality();
        }, () => {
        });

    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };

    async getNotificationPerm() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        // Token is of the form ExponentPushToken[<token value>]
        // We need to strip only the token value because we cannot store '[' and ']' as keys in firebase
        let leftBracketIndex = token.indexOf('[');
        let rightBracketIndex = token.indexOf(']');
        token = token.slice(leftBracketIndex + 1, rightBracketIndex);

        let userId = firebaseAuth.currentUser.uid;
        this.props.savePushToken(userId, token, (data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        });
    }

    initializeCheckInFunctionality = () => {

        //load all events the users can possibly check in to
        let {eventsAsAttendee} = this.props.currentUser;

        if (!eventsAsAttendee) {
            this.watchLocation();
            return;
        }

        eventsAsAttendee = Object.keys(eventsAsAttendee);

        const eventsToFetch = [];

        eventsAsAttendee.forEach(eventId => {
            if (!(eventId in this.props.eventReducer.byId)) {
                eventsToFetch.push(eventId);
            }
        });

        //handle lazily loading event data from firebase if the events aren't loaded into the client yet
        if (eventsToFetch.length > 0) {
            console.log('fetching attendee events');
            this.props.fetchEvents(eventsToFetch, () => {
                console.log('calling this');

            }, (error) => {
                console.log('calling that');
            });

        } else {
            console.log('not fetching atendee events');
        }
        this.watchLocation();

    };

    watchLocation = async () => {

        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            console.log("Permission not granted");
            return;
        }

        Location.watchPositionAsync({
            enableHighAccuracy: false,
            timeInterval: 5000,
            distanceInterval: 50,
        }, (loc) => {

            this.props.updateLocation(
                {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude
                });

            const currentUser = this.props.currentUser;
            let {eventsAsAttendee} = currentUser;

            if (eventsAsAttendee) {

                //get all the events the user is attending
                eventsAsAttendee = Object.keys(eventsAsAttendee);

                const events = this.props.eventReducer.byId;
                const userLocation = this.props.location;

                //check in to each event that the user can check in to
                eventsAsAttendee.forEach((eventId) => {

                    const event = events[eventId];

                    if (event) {

                        let checkedIn = false;

                        if (event.actualAttendees) {
                            checkedIn = event.actualAttendees && currentUser.uid in event.actualAttendees;
                        }

                        //is the user not checked in already?
                        if (!checkedIn) {

                            const startDate = event.startDate;

                            //has the event started?
                            if (moment().valueOf() >= startDate) {

                                const location = event.location;
                                const distance = haversine(location, userLocation, {unit: 'meter'}).toFixed(1);

                                //is the user within 120 meters of the event?
                                if (distance < 120) {

                                    //lets check them in!
                                    this.props.checkInToEvent(eventId, () => {
                                    }, (err) => {
                                        console.log(err);
                                    });

                                }

                            }

                        } else {

                            const startDate = event.startDate;

                            //has the event started? can we check the user OUT?
                            if (moment().valueOf() >= startDate) {

                                const location = event.location;
                                const distance = haversine(location, userLocation, {unit: 'meter'}).toFixed(1);

                                //is the user not within 120 meters of the event?
                                if (distance > 120) {

                                    //lets check them out!
                                    this.props.checkOutOfEvent(eventId, () => {
                                    }, (err) => {
                                        console.log(err);
                                    });

                                }

                            }
                        }

                    }

                });
            }

        });
    };

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={this.state.searchMode ? commonStyles.hidden : styles.container}>
                    <Feed onSearchIconPress={() => this.setState({searchMode: true})}/>
                </View>
                <View style={!this.state.searchMode ? commonStyles.hidden : styles.container}>
                    <ExploreSearch onCancel={() => this.setState({searchMode: false})}/>
                </View>
            </SafeAreaView>
        );

    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        location: state.feedReducer.location,
        peopleReducer: state.peopleReducer,
        currentUser: state.authReducer.user
    }
};


//allows the component to use actions as props
const actions = {
    persistCurrentUser,
    signOut,
    updateLocation,
    checkInToEvent,
    checkOutOfEvent,
    fetchEvents,
    savePushToken,
};

export default connect(mapStateToProps, actions)(HomeScreen);
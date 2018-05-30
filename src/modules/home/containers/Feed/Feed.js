import React from 'react';
import {Constants, Location, Permissions, Notifications} from 'expo';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {ActivityIndicator, Animated, Platform, SafeAreaView, Text, View} from "react-native";

import {auth as firebaseAuth} from "../../../../config/firebase";
import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import {savePushToken} from '../../../../network/firebase/pushnotifications/actions';
import {fetchFeed, updateLocation} from '../../../../network/firebase/feed/actions';
import EventListView from "../../../event/components/EventListView/EventListView";
import {fetchUsers} from "../../../../network/firebase/user/actions";
import styles from "./styles";
import commonStyles from "../../../../styles/commonStyles";
import headerStyles from "../../../../styles/headerStyles";
import {HEADER_HEIGHT} from "../../../../config/constants";
import {Icon} from "react-native-elements";

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            scrollY: new Animated.Value(0),
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

        if(!this.props.feedReducer.locFetched){
            let location = await Location.getCurrentPositionAsync({});

            const lat = location.coords.latitude;
            const lng = location.coords.longitude;

            //update location in store
            this.props.updateLocation({latitude: lat, longitude: lng});
        }

    };

    fetchFeed = () => {
        const location = this.props.feedReducer.location;

        //load events into store
        this.props.fetchFeed(location, () => {
            this.setState({dataLoaded: true})
        }, (error) => {
            console.log(error);
        })
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


    render() {

        if (!this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        // Save push notification token in firebase
        this.getNotificationPerm();

        const eventIds = this.props.eventReducer.allIds;
        const events = this.props.eventReducer.byId;

        //only select from events with dates later than "now"
        const now = Date.now();
        const filteredEventIds = eventIds.filter(id => now < events[id].startDate);

        //from the remaining events, get the ones with dates closest to "now"
        filteredEventIds.sort(function (a, b) {
            return events[a].startDate - events[b].startDate;
        });

        const hasEvents = filteredEventIds.length > 0;

        //opacity decreases as the scrolling goes on
        let opacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [1, 0],
        });

        //header hides itself as the scrolling goes on
        let translateY = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -HEADER_HEIGHT],
            extrapolate: 'clamp',
        });

        return (
            <SafeAreaView style={styles.container}>

                {!hasEvents &&
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>There aren't any events yet!</Text>
                </View>
                }

                <EventListView eventIds={filteredEventIds} onRefresh={this.fetchFeed}
                               scrollY={this.state.scrollY} animated/>

                <Animated.View
                    style={[headerStyles.padded, headerStyles.rowContainer, styles.headerWrapper, {
                        opacity: opacity,
                        transform: [{translateY}]
                    }]}>
                    <Text style={headerStyles.headerText}>Feed</Text>

                    <Icon type='ionicon' name="md-search" size={35} color={"white"}
                          onPress={() => this.props.onSearchIconPress()}/>
                </Animated.View>

            </SafeAreaView>
        );

    }
}

Feed.propTypes = {
    onSearchIconPress: PropTypes.func
};

Feed.defaultProps = {
    onSearchIconPress: () => {
    }
};

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
    persistCurrentUser,
    savePushToken
};

export default connect(mapStateToProps, actions)(Feed);
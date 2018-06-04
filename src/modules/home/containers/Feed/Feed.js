import React from 'react';
import {Constants, Location} from 'expo';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {ActivityIndicator, Animated, Platform, SafeAreaView, Text, View} from "react-native";
import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import {fetchFeed, updateLocation} from '../../../../network/firebase/feed/actions';
import EventCardListView from "../../../event/components/EventCardListView/EventCardListView";
import {fetchUsers} from "../../../../network/firebase/user/actions";
import styles from "./styles";
import commonStyles from "../../../../styles/commonStyles";
import headerStyles from "../../../../styles/headerStyles";
import {HEADER_HEIGHT} from "../../../../config/constants";
import {Icon} from "react-native-elements";
import {debounce} from "lodash";
import {color} from "../../../../styles/theme";

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            scrollY: new Animated.Value(0),
            eventIds: [],
            events: {}
        };

        this.debouncedFetchFeed = debounce(this.fetchFeed, 3000);

    }

    componentDidMount() {
        console.log('mount my ass');
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("IT DIDN'T WORK");
        } else {
            this._getLocationAsync().then(() => {
                this.fetchFeed()
            });
        }
    };


    _getLocationAsync = async () => {

        if (this.props.feedReducer.locFetched) {
            let location = await Location.getCurrentPositionAsync({});

            const lat = location.coords.latitude;
            const lng = location.coords.longitude;

            //update location in store
            this.props.updateLocation({latitude: lat, longitude: lng});
        }

    };

    fetchFeed = () => {
        const location = this.props.feedReducer.location;
        const fetchingDistance = this.props.settings.fetchingDistance;

        //load events into store
        this.props.fetchFeed(location, fetchingDistance, (data) => {
            this.setState({
                dataLoaded: true,
                eventIds: Object.keys(data.events),
                events: data.events
            })
        }, (error) => {
            console.log(error);
        })
    };


    render() {
        let {eventIds} = this.state;

        if (!this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        // const eventIds = this.props.eventReducer.allIds;
        const events = this.props.eventReducer.byId;

        //only select from events with dates later than "now"
        // const now = Date.now();
        // const filteredEventIds = eventIds.filter(id => now < events[id].endDate);

        //from the remaining events, get the ones with dates closest to "now"
        // filteredEventIds.sort(function (a, b) {
        //     return events[a].startDate - events[b].startDate;
        // });
        eventIds = eventIds.filter(id => {
            return events[id] !== undefined;
        });

        eventIds.sort(function (a, b) {
            if (events[a] !== undefined && events[b] !== undefined) {
                return events[a].startDate - events[b].startDate;
            }
        });
        const hasEvents = eventIds.length > 0;

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
                {
                    !hasEvents &&
                    <View style={commonStyles.emptyContainer}>
                        <Text style={commonStyles.emptyText}>There aren't any events yet!</Text>
                    </View>
                }

                <EventCardListView eventIds={eventIds} onRefresh={this.debouncedFetchFeed}
                                   scrollY={this.state.scrollY} animated/>

                <Animated.View
                    style={[headerStyles.padded, headerStyles.rowContainer, styles.headerWrapper, {
                        opacity: opacity,
                        transform: [{translateY}]
                    }]}>
                    <Text style={headerStyles.headerText}>Feed</Text>

                    <Icon type='ionicon' name="md-search" size={35} color={"white"}
                          underlayColor={color.underlay}
                          containerStyle={styles.searchIconContainer}
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
        user: state.authReducer.user,
        settings: state.authReducer.settings,
    }
};

//allows the component to use actions as props
const actions = {
    fetchFeed,
    updateLocation,
    signOut,
    fetchUsers,
    persistCurrentUser,
};

export default connect(mapStateToProps, actions)(Feed);
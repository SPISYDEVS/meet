import React from 'react';
import PropTypes from 'prop-types'

import {FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';

import styles from "./styles";
import commonStyles from '../../../../styles/commonStyles';
import {Avatar, Button, Icon} from "react-native-elements";
import formStyles from "../../../../styles/formStyles";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';

import {fetchUsers} from '../../../../network/firebase/user/actions';
import {rsvpEvent} from '../../../../network/firebase/event/actions';
import handleViewProfile from "../../../people/utils/handleViewProfile";
import moment from "moment";
import UserListItem from "../../../people/components/UserListItem/UserListItem";
import {LinearGradient} from 'expo';
import {fetchBackgroundGradient} from "../../utils";


class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
    }

    componentDidUpdate() {
        console.log("MY UPDATE");
    }

    componentDidMount() {

        //lazily load attendee information
        const event = this.props.eventReducer.byId[this.props.eventId];

        if (event === undefined || event.plannedAttendees === undefined) {
            this.setState({dataLoaded: true});
            return;
        }

        const plannedAttendees = Object.keys(event.plannedAttendees);

        //handle lazily loading user data from firebase if the users aren't loaded into the client yet
        let usersToFetch = [];

        plannedAttendees.forEach(id => {
            if (!(id in this.props.peopleReducer.byId)) {
                usersToFetch.push(id);
            }
        });

        if (usersToFetch.length > 0) {
            console.log(usersToFetch);
            this.props.fetchUsers(usersToFetch, () => {
                this.setState({dataLoaded: true});
            }, () => {
            });
        } else {
            this.setState({dataLoaded: true});
        }

    }

    renderItem = (item) => {
        const userId = item.item;
        return <UserListItem userId={userId}/>
    };

    render() {

        const event = this.props.eventReducer.byId[this.props.eventId];
        const host = this.props.peopleReducer.byId[event.hostId];

        if (!this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        if (event === undefined) {
            return <View/>
        }

        let {title, startDate, address, description, hostId, plannedAttendees, actualAttendees} = event;
        let currentUserIsAttending = false;

        if (plannedAttendees === undefined) {
            plannedAttendees = [];
        } else {
            plannedAttendees = Object.keys(plannedAttendees);
            if (plannedAttendees.includes(this.props.currentUser.uid)) {
                currentUserIsAttending = true;
            }
        }

        if (actualAttendees === undefined) {
            actualAttendees = [];
        } else {
            actualAttendees = Object.keys(actualAttendees);
        }

        if (!plannedAttendees) {
            plannedAttendees = null;
        }

        if (!actualAttendees) {
            actualAttendees = null;
        }

        const eventHappening = (moment().unix() * 1000) > parseInt(startDate);

        const backgroundGradient = fetchBackgroundGradient(startDate);
        startDate = moment(startDate).calendar();

        return (
            <LinearGradient colors={backgroundGradient}
                            style={{flex: 1}}
                            start={[.5, .5]}>
                <SafeAreaView style={[styles.container]}>

                    <View style={styles.navBar}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Icon name='chevron-left' type='feather' color='#007AFF' size={40}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                {title}
                            </Text>

                            <Text style={styles.subtitle}>
                                {startDate
                                + "\n"
                                + address}
                            </Text>
                        </View>


                        <View style={styles.details}>
                            <Text style={styles.description}>
                                {description}
                            </Text>
                        </View>

                        <View style={styles.hostContainer}>
                            <Avatar
                                small
                                rounded
                                source={{uri: host.profile !== undefined ? host.profile.source : ''}}
                                onPress={() => handleViewProfile(hostId)}
                                activeOpacity={0.7}
                            />
                            <Text style={styles.hostName}>
                                {`${host.firstName} ${host.lastName}`}
                            </Text>
                        </View>
                        {
                            eventHappening &&

                            <Text style={styles.boldSubtitle}>
                                Who's Here ({actualAttendees.length})
                            </Text>
                        }
                        <Text style={styles.boldSubtitle}>
                            Who's Going ({plannedAttendees.length})
                        </Text>
                        <View style={styles.attendeesContainer}>
                            <FlatList
                                style={styles.container}
                                data={plannedAttendees}
                                renderItem={(item) => this.renderItem(item)}
                                keyExtractor={(userId) => userId}
                                // refreshing={this.state.refreshing}
                                // onRefresh={() => this.props.onRefresh()}
                            />
                        </View>
                        {!currentUserIsAttending &&
                        <Button
                            raised
                            title='RSVP'
                            borderRadius={4}
                            containerViewStyle={formStyles.containerView}
                            buttonStyle={formStyles.button}
                            textStyle={formStyles.buttonText}
                            onPress={() => this.props.rsvpEvent(this.props.eventId, () => {
                            }, () => {
                            })}
                        />
                        }
                    </ScrollView>

                </SafeAreaView>
            </LinearGradient>

        );

    }
}

EventDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    // plannedAttendees: PropTypes.list
};

EventDetails.defaultProps = {
    title: 'Event Title',
    startDate: 'Today, 12:30pm',
    address: 'Warren College',
    hostId: null,
    hostPic: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    hostName: "Jane",
    description: 'This is a really thought out description to test our dummy component EventDetails! It has really really long text.',
    actualAttendees: [
        {picture: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg", name: "Jane"},
        {picture: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg", name: "Bobby"}
    ],
    plannedAttendees: [
        {picture: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg", name: "Jane"},
        {picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg", name: "Brynn"},
        {picture: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg", name: "Bobby"}
    ]
};

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        currentUser: state.authReducer.user,
        peopleReducer: state.peopleReducer,
    }
};

const actions = {
    fetchUsers,
    rsvpEvent
};

export default connect(mapStateToProps, actions)(EventDetails);

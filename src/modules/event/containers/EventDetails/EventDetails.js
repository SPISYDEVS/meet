import React from 'react';
import PropTypes from 'prop-types'

import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import styles from "./styles"
import {Avatar, Button, Icon} from "react-native-elements";
import formStyles from "../../../../styles/formStyles";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';

import {fetchUsers} from '../../../../network/firebase/user/actions';
import {rsvpEvent} from '../../../../network/firebase/event/actions';
import handleViewProfile from "../../../people/utils/handleViewProfile";
import moment from "moment";
import {fetchBackgroundColor} from "../../utils";


class EventDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        //lazily load attendee information
        const event = this.props.eventReducer.byId[this.props.eventId];

        if (event === undefined || event.plannedAttendees === undefined) {
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
            this.props.fetchUsers(usersToFetch, () => {
            }, () => {
            });
        }

    }

    render() {

        const event = this.props.eventReducer.byId[this.props.eventId];
        const host = this.props.peopleReducer.byId[event.hostId];

        if (event === undefined) {
            return <View/>
        }

        if (event.plannedAttendees === undefined) {
            event.plannedAttendees = [];
        }

        if (event.actualAttendees === undefined) {
            event.actualAttendees = [];
        }

        let {title, date, address, description, hostId, plannedAttendees, actualAttendees} = event;

        const eventHappening = (moment().unix() * 1000) > parseInt(date);

        const backgroundColor = fetchBackgroundColor(date);
        date = moment(date).calendar();

        //pull the user objects using their associated ids
        plannedAttendees = Object.keys(plannedAttendees).map(id => {
            if (id in this.props.peopleReducer.byId) {
                return this.props.peopleReducer.byId[id];
            }
            return {}
        });


        return (
            <SafeAreaView style={{backgroundColor: backgroundColor, height: '100%'}}>
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
                            {date
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
                    <View style={styles.attendeesContainer}>
                        {
                            actualAttendees.map((user, i) => (
                                <View key={i} style={styles.attendees}>
                                    <Avatar
                                        small
                                        rounded
                                        source={{uri: user.profile === undefined ? '' : user.profile.source}}
                                        onPress={() => handleViewProfile(hostId)}
                                        activeOpacity={0.7}
                                    />
                                    <Text style={styles.hostName}>
                                        {user.firstName + user.lastName}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>


                    <Text style={styles.boldSubtitle}>
                        Who's Going ({plannedAttendees.length})
                    </Text>
                    <View style={styles.attendeesContainer}>
                        {
                            plannedAttendees.map((user, i) => (
                                <View key={i} style={styles.attendees}>
                                    <Avatar
                                        small
                                        rounded
                                        source={{uri: user.profile === undefined ? '' : user.profile.source}}
                                        // source={{uri: item.picture}}
                                        onPress={() => handleViewProfile(user.uid)}
                                        activeOpacity={0.7}
                                    />
                                    <Text style={styles.hostName}>
                                        {/*{item.name}*/}
                                        {user.firstName + " " + user.lastName}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>

                    <Button
                        raised
                        title='TEMPORARY RSVP'
                        borderRadius={4}
                        containerViewStyle={formStyles.containerView}
                        buttonStyle={formStyles.button}
                        textStyle={formStyles.buttonText}
                        onPress={() => this.props.rsvpEvent(this.props.eventId, () => {
                        }, () => {
                        })}
                    />

                </ScrollView>
            </SafeAreaView>
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
    date: 'Today, 12:30pm',
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
        peopleReducer: state.peopleReducer,
    }
};

const actions = {
    fetchUsers,
    rsvpEvent
};

export default connect(mapStateToProps, actions)(EventDetails);
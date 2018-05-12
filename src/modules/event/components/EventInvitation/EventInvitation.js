import React from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import {fetchEvent, respondToEventInvitation} from "../../../../network/firebase/event/actions";


class EventInvitation extends React.Component {
    constructor() {
        super();
    }

    render() {

        const {eventId} = this.props;
        const event = this.props.eventReducer.byId[eventId];
        const host = this.props.peopleReducer.byId[event.hostId];
        const hostName = host.firstName + " " + host.lastName;

        return (
            <View style={styles.container}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>Event Invitation</Text>
                    <Text style={styles.description}>
                        {hostName + " invited you to " + event.title + "!"}
                    </Text>
                </View>
                <TouchableOpacity style={styles.actionButton}
                                  onPress={() => this.props.respondToEventInvitation(eventId, true, () => {
                                  }, () => {
                                  })}>
                    <Icon name="ios-checkmark-circle-outline" type="ionicon" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}
                                  onPress={() => this.props.respondToEventInvitation(eventId, false, () => {
                                  }, () => {
                                  })}>
                    <Icon name="ios-close-circle-outline" type="ionicon" size={30}/>
                </TouchableOpacity>
            </View>
        );
    }
}

EventInvitation.propTypes = {
    event: PropTypes.object,
    host: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        peopleReducer: state.peopleReducer
    }
};

const actions = {
    respondToEventInvitation,
    fetchEvent
};


export default connect(mapStateToProps, actions)(EventInvitation);
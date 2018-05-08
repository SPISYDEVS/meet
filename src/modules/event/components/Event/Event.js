import React from 'react';
import PropTypes from 'prop-types';

import {Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from "./styles";
import {Avatar, Icon} from "react-native-elements";

import EventDetails from "../../containers/EventDetails";
import handleViewProfile from "../../../people/utils/handleViewProfile";


class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePress = () => {
        // const {title, description, date, hostPic, hostName, distance, address, plannedAttendees, eventId} = this.props;

        Actions.push('EventDetails', {eventId: this.props.eventId});
        // this.setState({eventDetails: true});
    };

    // closeModal = () => {
    //     this.setState({eventDetails: false});
    // };

    render() {
        const {title, description, date, hostPic, hostId, hostName, distance} = this.props;

        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                    <View style={styles.topContainer}>
                      <StatusBar hidden={true}/>
                      <View style={styles.info}>
                          <Text style={styles.title}>
                              {title}
                          </Text>
                          <Text style={styles.subtitle}>
                              {date + " | " + distance + " miles away"}
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
                              source={{uri: hostPic}}
                              onPress={() => handleViewProfile(hostId)}
                              activeOpacity={0.7}
                          />
                          <Text style={styles.hostName}>
                              {hostName}
                          </Text>
                      </View>
                    </View>
                      <View style={styles.botContainer}>

                      </View>
                </TouchableOpacity>

            </View>
        );
    }
}

Event.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

Event.defaultProps = {
    title: 'Really Long Event Title',
    description: 'This is a really thought out description to test our dummy component EventDetails! It has really really long text.',
    date: 'Today, 12:30pm',
    distance: '0',
    hostId: null,
    address: 'Warren College',
    hostPic: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    hostName: "Jane",
    plannedAttendees: [],
};

export default Event;

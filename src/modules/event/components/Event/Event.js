import React from 'react';
import PropTypes from 'prop-types';

import {Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Modal from 'react-native-modal';

import styles from "./styles"
import {Avatar, Icon} from "react-native-elements";

//import Modal from "react-native-modal";
import EventDetails from "../EventDetails"

class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePress = () => {
        // const {title, description, date, hostPic, hostName, distance, address, plannedAttendees, eventId} = this.props;

        Actions.push('EventDetails', {...this.props});
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
                            onPress={() => Actions.push('SomeonesProfile', {userId: hostId})}
                            activeOpacity={0.7}
                        />
                        <Text style={styles.hostName}>
                            {hostName}
                        </Text>
                    </View>
                </TouchableOpacity>

                {/*<Modal isVisible={this.state.eventDetails} style={styles.modal}>*/}
                    {/*<TouchableOpacity style={styles.modalHeader}*/}
                                      {/*onPress={() => this.closeModal()}>*/}
                        {/*<Icon*/}
                            {/*name='close'*/}
                        {/*/>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<EventDetails*/}
                        {/*title={title}*/}
                        {/*date={date}*/}
                        {/*location={address}*/}
                        {/*hostPic={hostPic}*/}
                        {/*hostName={hostName}*/}
                        {/*description={description}*/}
                        {/*plannedAttendees={plannedAttendees}*/}
                        {/*eventId={eventId}*/}
                    {/*/>*/}
                {/*</Modal>*/}

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

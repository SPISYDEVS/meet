import React from 'react';
import PropTypes from 'prop-types'

import {Text, View, TouchableOpacity} from 'react-native';

import styles from "./styles"
import {Avatar, Button} from "react-native-elements";

import Modal from "react-native-modal";
import EventDetails from "../EventDetails"

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: false
        };
    }

    handlePress = () => {
        this.setState({eventDetails: true});
    };

    closeModal = () => {
        this.setState({eventDetails: false});
    };

    render() {
        const {title, description, date, location, hostPic, hostName} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                <View style={styles.info}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {date + " | " + location}
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
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <Text style={styles.hostName}>
                        {hostName}
                    </Text>
                </View>

                <Modal isVisible={this.state.eventDetails}>
                    <View style={styles.detailsModal}>
                        {/*<Icon*/}
                            {/*onPress={this.closeModal}*/}
                            {/*buttonStyle={styles.detailsModalButton}*/}
                            {/*title="Press to close."*/}
                        {/*/>*/}
                        <EventDetails
                            title={title}
                            date={date}
                            location={location}
                            hostPic={hostPic}
                            hostName={hostName}
                            description={description}
                        />
                    </View>
                </Modal>
            </TouchableOpacity>
        );
    }
}

Event.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

Event.defaultProps = {
    title: 'Event',
    description: 'This is a really thought out description to test our dummy component EventDetails! It has really really long text.',
    date: 'Today',
    location: 'Warren College',
    hostPic: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    hostName: "Jennifer"
};

export default Event;
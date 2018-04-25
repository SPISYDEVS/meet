import React from 'react';
import PropTypes from 'prop-types'

import {Text, View, TouchableOpacity} from 'react-native';

import styles from "./styles"
import {Avatar} from "react-native-elements";

class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, description, date, location, hostPic, hostName} = this.props;

        return (
            <View style={styles.container}>
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
            </View>
        );
    }
}

Event.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

Event.defaultProps = {
    title: 'Event',
    description: 'This is a really thought out description to test our dummy component Event! It has really really long text.',
    date: 'Today',
    location: 'Warren College',
    hostPic: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    hostName: "Bobby Dickems"
};

export default Event;
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Text, View, TouchableOpacity, StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from "./styles";
import {Avatar, Icon} from "react-native-elements";

import EventDetails from "../../containers/EventDetails";
import handleViewProfile from "../../../people/utils/handleViewProfile";
import {getUser} from "../../../../network/firebase/user/actions";
import {MORNING_START, AFTERNOON_START, NIGHT_START, LATENIGHT_START} from "../../../../config/constants";
import {color} from "../../../../styles/theme";
import moment from "moment";

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hostPic: ''
        };
    }

    isBetweenTime = (time, startTime, endTime) => {
        let startHour = moment(startTime, 'HH:mm').hours();
        let endHour = moment(endTime, 'HH:mm').hours();

        if(startHour > endHour){
            endHour += 24;
        }

        const timeHours = moment(time).hours();

        return startHour <= timeHours && timeHours < endHour;
    };

    fetchBackgroundColor = (date) => {
        if(this.isBetweenTime(date, MORNING_START, AFTERNOON_START)){
            return color.morning;
        }
        if(this.isBetweenTime(date, AFTERNOON_START, NIGHT_START)){
            return color.afternoon;
        }
        if(this.isBetweenTime(date, NIGHT_START, LATENIGHT_START)){
            return color.night;
        }

        return color.latenight;
    };

    handlePress = () => {
        Actions.push('EventDetails', {eventId: this.props.eventId});
    };

    render() {

        const {title, description, date, hostId, hostName, distance, hostPic} = this.props;
        const backgroundColor = this.fetchBackgroundColor(date);
        const formattedDate = moment(date).calendar();

        return (
            <View style={styles.shadowWrapper}>
                <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                    <View style={[styles.topContainer, {backgroundColor: backgroundColor}]}>
                        {/*<StatusBar hidden={true}/>*/}
                        <View style={styles.header}>

                            <View style={styles.headerLeft}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                                <Text style={styles.dateText}>
                                    {formattedDate}
                                </Text>
                            </View>

                            <View style={styles.headerRight}>
                                <Text style={styles.distanceText}>
                                    {distance + " miles away"}
                                </Text>

                            </View>

                        </View>

                        <View style={styles.body}>
                            <Text style={styles.description} numberOfLines={2}>
                                {description}
                            </Text>
                        </View>

                        <View style={styles.footer}>
                            <Avatar
                                size={30}
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
                    {/*<View style={styles.botContainer}/>*/}
                </TouchableOpacity>

            </View>
        );
    }
}

Event.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    hostPic: PropTypes.string,
    hostName: PropTypes.string,
    distance: PropTypes.string,
    hostId: PropTypes.string,
    // date: PropTypes.string,
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

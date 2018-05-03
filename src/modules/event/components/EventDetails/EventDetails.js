import React from 'react';
import PropTypes from 'prop-types'

import {Text, ScrollView, View, TouchableOpacity} from 'react-native';

import styles from "./styles"
import {Avatar, Button} from "react-native-elements";
import formStyles from "../../../../styles/formStyles";
import {connect} from "react-redux";

import {actions as people} from "../../../people/index";
import {rsvpEvent} from "../../actions";

const {fetchUsers} = people;

class EventDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers(this.props.plannedAttendees, () => {
        }, () => {
        });
    }

    render() {

        let {title, date, location, hostPic, hostName, description, actualAttendees, plannedAttendees, eventId} = this.props;

        plannedAttendees = plannedAttendees.map(id => {
            if (id in this.props.peopleReducer.byId) {
                return this.props.peopleReducer.byId[id];
            }
            return {}
        });

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <Text style={styles.subtitle}>
                        {date
                        + "\n"
                        + location}
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

                <View style={styles.details}>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>

                <Text style={styles.boldSubtitle}>
                    Who's Here ({actualAttendees.length})
                </Text>
                <View style={styles.attendeesContainer}>
                    {
                        actualAttendees.map((item, i) => (
                            <View key={i} style={styles.attendees}>
                                <Avatar
                                    small
                                    rounded
                                    source={{uri: item.picture}}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                />
                                <Text style={styles.hostName}>
                                    {item.name}
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
                        plannedAttendees.map((item, i) => (
                            <View key={i} style={styles.attendees}>
                                <Avatar
                                    small
                                    rounded
                                    source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                                    // source={{uri: item.picture}}
                                    onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                />
                                <Text style={styles.hostName}>
                                    {/*{item.name}*/}
                                    {item.firstName + " " + item.lastName}
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
                    onPress={() => this.props.rsvpEvent(eventId, () => {
                    }, () => {
                    })}
                />

            </ScrollView>
        );
    }
}

EventDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

EventDetails.defaultProps = {
    title: 'Event Title',
    date: 'Today, 12:30pm',
    location: 'Warren College',
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
        peopleReducer: state.peopleReducer
    }
};

export default connect(mapStateToProps, {fetchUsers, rsvpEvent})(EventDetails);
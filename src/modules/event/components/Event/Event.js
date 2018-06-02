import React from 'react';
import {connect} from 'react-redux';

import {Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from "./styles";
import {Avatar} from "react-native-elements";

import EventDetails from "../../containers/EventDetails";
import handleViewProfile from "../../../people/utils/handleViewProfile";
import moment from "moment";
import {fetchEvent} from "../../../../network/firebase/event/actions";
import {getProfileImage} from "../../../../network/firebase/user/actions";
import haversine from "haversine";
import {fetchBackgroundColor} from "../../utils";

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');

class Event extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            hostPic: null,
        }
    }

    componentDidMount() {
        const eventId = this.props.eventId;
        this.fetchEvent(eventId);
    }

    fetchEvent = (eventId) => {

        //handle lazily loading event data from firebase if the events aren't loaded into the client yet
        if (!(eventId in this.props.eventReducer.byId)) {
            this.props.fetchEvent(eventId, () => {
                this.setState({dataLoaded: true});
            }, () => {
            });
        } else {
            this.setState({dataLoaded: true});
        }

    };

    handlePress = () => {
        Actions.push('EventDetails', {eventId: this.props.eventId});
    };


    fetchProfilePicture = (userId) => {
        this.props.getProfileImage(userId,
            (profile) => {
                this.setState({
                    hostPic: profile.source
                });
            },
            (error) => {
                console.log(error);
            });
    };


    render() {

        if (!this.state.dataLoaded) {
            return <View/>
        }

        const event = this.props.eventReducer.byId[this.props.eventId];
        const host = this.props.peopleReducer.byId[event.hostId];

        this.fetchProfilePicture(event.hostId);

        const {title, description, startDate, hostId, location} = event;
        const {profile, firstName, lastName} = host;

        //host data
        const {hostPic} = this.state;
        const hostName = firstName + " " + lastName;

        //get miles away
        const userLocation = this.props.location;
        const distance = haversine(location, userLocation, {unit: 'mile'}).toFixed(1);

        //date in calendar format
        const formattedDate = moment(startDate).calendar();

        //card background
        const backgroundColor = fetchBackgroundColor(startDate);

        return (
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
                                source={hostPic === null ? defaultImage : {uri: hostPic}}
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        peopleReducer: state.peopleReducer,
        location: state.feedReducer.location
    }
};

export default connect(mapStateToProps, {fetchEvent, getProfileImage})(Event);

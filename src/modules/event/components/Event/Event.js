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


const mapStateToProps = (state) => {
    return {
        user: state.eventReducer.eventUser
    }
};


class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hostPic: ''
        };
    }

    handlePress = () => {
        Actions.push('EventDetails', {eventId: this.props.eventId});
    };

    componentWillMount() {
        let hostId = this.props.hostId;
        this.props.getUser(hostId, this.onSuccess, this.onError);
    }


    onSuccess = (user) => {
        let source = user.profile === undefined ? '' : user.profile.source;
        this.setState({hostPic: source});
    };


    onError = (error) => {
        console.log(error);
    };


    render() {
        const {title, description, date, hostId, hostName, distance} = this.props;
        const {hostPic} = this.state;

        return (
            <View style={styles.shadowWrapper}>
                <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                    <View style={styles.topContainer}>
                        {/*<StatusBar hidden={true}/>*/}
                        <View style={styles.header}>

                            <View style={styles.headerLeft}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                            </View>
                            <View style={styles.headerRight}>
                                <Text style={styles.distanceText}>
                                    {distance + " miles away"}
                                </Text>
                                <Text style={styles.dateText}>
                                    {date}
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
                    <View style={styles.botContainer}/>
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

export default connect(mapStateToProps, {getUser})(Event);

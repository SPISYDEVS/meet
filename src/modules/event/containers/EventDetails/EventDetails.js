import React from 'react';
import PropTypes from 'prop-types';

import {ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View} from 'react-native';

import styles from "./styles";
import commonStyles from '../../../../styles/commonStyles';
import {Button} from "react-native-elements";
import formStyles from "../../../../styles/formStyles";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';

import {fetchUsers} from '../../../../network/firebase/user/actions';
import {cancelRsvpEvent, fetchEvent, rsvpEvent} from '../../../../network/firebase/event/actions';
import moment from "moment";
import UserListItem from "../../../people/components/UserListItem/UserListItem";
import {LinearGradient} from 'expo';
import {fetchBackgroundGradient} from "../../utils";
import {DATE_FORMAT} from "../../../../config/constants";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
import Tag from "../../../common/components/Tag/Tag";


class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            offset: 0,
            upScroll: true,
            refreshing: false,
        };
    }

    componentDidMount() {

        //lazily load attendee information
        const event = this.props.eventReducer.byId[this.props.eventId];

        if (event === undefined || event.plannedAttendees === undefined) {
            this.setState({dataLoaded: true});
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
            console.log(usersToFetch);
            this.props.fetchUsers(usersToFetch, () => {
                this.setState({dataLoaded: true});
            }, () => {
            });
        } else {
            this.setState({dataLoaded: true});
        }

    }

    eventComments = () => {

        const event = this.props.eventReducer.byId[this.props.eventId];
        let {startDate} = event;
        const backgroundGradient = fetchBackgroundGradient(startDate);
        Actions.push('EventComments', {
            eventId: this.props.eventId,
            backgroundGradient: backgroundGradient
        });

    };

    editEvent = () => {

        //navigates to the edit event screen, passing the event data to the form
        const event = this.props.eventReducer.byId[this.props.eventId];
        let {title, startDate, endDate, location, tags, plannedAttendees, address, description, hostId, invitations} = event;

        plannedAttendees = plannedAttendees ? Object.keys(plannedAttendees) : [];
        let invitees = invitations ? Object.keys(invitations) : [];

        startDate = moment(startDate).format(DATE_FORMAT);
        endDate = endDate ? moment(endDate).format(DATE_FORMAT) : '';

        tags = tags ? Object.keys(tags) : undefined;

        Actions.push('EditEvent', {
            editMode: true,
            tags: tags,
            title: title,
            startDate: startDate,
            endDate: endDate,
            location: location,
            address: address,
            description: description,
            invitees: invitees,
            plannedAttendees: plannedAttendees,
            eventId: this.props.eventId
        });
    };

    renderItem = (item) => {
        const userId = item.item;
        return <UserListItem userId={userId}/>
    };

    onRsvpButtonPress = (userAttending) => {
        if (userAttending) {
            this.props.cancelRsvpEvent(this.props.eventId, () => {
            }, () => {
            })
        } else {
            this.props.rsvpEvent(this.props.eventId, () => {
            }, () => {
            })
        }
    };

    onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const upScroll = currentOffset < this.state.offset;
        this.setState({offset: currentOffset, upScroll: upScroll});
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.fetchEvent(this.props.eventId, () => {
            this.setState({refreshing: false}, err => console.log(err));
        });
    };

    generateHeaderProps = (isHost) => {

        const rightHeaderButtons = [{
            iconName: 'bubble',
            iconType: 'simple-line-icon',
            size: 28,
            onPress: () => this.eventComments()
        }];

        if (isHost) {

            rightHeaderButtons.push({
                iconName: 'edit-2',
                iconType: 'feather',
                size: 30,
                onPress: () => this.editEvent()
            });

        }

        return {
            simpleBackChevron: true,
            rightHeaderButtons: rightHeaderButtons
        }

    };

    render() {

        const event = this.props.eventReducer.byId[this.props.eventId];

        if (event === undefined || !this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        let {title, startDate, address, description, tags, hostId, plannedAttendees, actualAttendees} = event;
        let currentUserIsAttending = false;

        //fetch the users that are planning to attend the event
        if (plannedAttendees === undefined) {
            plannedAttendees = [];
        } else {
            plannedAttendees = Object.keys(plannedAttendees);
            if (plannedAttendees.includes(this.props.currentUser.uid)) {
                currentUserIsAttending = true;
            }
        }

        //fetch the users that are checked into the event
        if (actualAttendees === undefined) {
            actualAttendees = [];
        } else {
            actualAttendees = Object.keys(actualAttendees);
        }

        const eventHappening = (moment().utc()) > parseInt(startDate);

        const backgroundGradient = fetchBackgroundGradient(startDate);
        startDate = moment.utc(startDate).local().calendar();

        //initialize the buttons on the header of the screen
        const headerProps = this.generateHeaderProps(this.props.currentUser.uid === hostId);

        return (
            <LinearGradient colors={backgroundGradient}
                            style={{flex: 1}}
                            start={[.5, .15]}>

                <SafeAreaView style={{flex: 1}}>

                    <BackHeader {...headerProps}/>

                    <ScrollView style={styles.container}
                                onScrollBeginDrag={this.onScroll}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }>

                        <View style={styles.header}>

                            <Text style={styles.title}>
                                {title}
                            </Text>

                        </View>

                        <View style={styles.subHeader}>
                            <Text style={styles.date}>
                                {startDate}
                            </Text>

                            <Text style={styles.location}>
                                {address}
                            </Text>
                        </View>


                        {!!description &&
                        <View style={styles.details}>
                            <Text style={styles.description}>
                                {description}
                            </Text>
                        </View>
                        }

                        {
                            tags &&
                            <View style={styles.tagContainer}>

                                <FlatList
                                    contentContainerStyle={styles.tagFlatList}
                                    data={Object.keys(tags)}
                                    renderItem={(tag) => (
                                        <Tag key={tag.item} title={tag.item} textColor={backgroundGradient[1]}
                                             editMode={false}
                                             onPress={() => {}}
                                        />
                                    )}
                                />

                            </View>
                        }

                        <View style={styles.hostContainer}>
                            <UserListItem userId={hostId}/>
                        </View>

                        {
                            !!eventHappening &&
                            <View>
                                <Text style={styles.boldSubtitle}>
                                    Who's Here ({actualAttendees.length})
                                </Text>
                                <View style={styles.attendeesContainer}>
                                    <FlatList
                                        data={actualAttendees}
                                        renderItem={(item) => this.renderItem(item)}
                                        keyExtractor={(userId) => userId}
                                    />
                                </View>
                            </View>
                        }
                        <View>

                            <Text style={styles.boldSubtitle}>
                                Who's Going ({plannedAttendees.length})
                            </Text>
                            <View style={styles.attendeesContainer}>
                                <FlatList
                                    data={plannedAttendees}
                                    renderItem={(item) => this.renderItem(item)}
                                    keyExtractor={(userId) => userId}
                                />
                            </View>

                        </View>


                    </ScrollView>

                    <RoundedButton
                        title={currentUserIsAttending ? 'Cancel RSVP' : 'RSVP'}
                        onPress={() => this.onRsvpButtonPress(currentUserIsAttending)}/>

                </SafeAreaView>
            </LinearGradient>

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
    startDate: 'Today, 12:30pm',
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
        currentUser: state.authReducer.user,
        peopleReducer: state.peopleReducer,
    }
};

const actions = {
    fetchUsers,
    fetchEvent,
    rsvpEvent,
    cancelRsvpEvent
};

export default connect(mapStateToProps, actions)(EventDetails);

import React from 'react';
import {connect} from 'react-redux';

import styles from "./styles"

import {ScrollView, View} from "react-native";

import FriendRequest from "../../components/FriendRequest/FriendRequest";

import {fetchUsers} from "../../../../network/firebase/user/actions";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import EventInvitation from "../../../event/components/EventInvitation/EventInvitation";
import {arraysEqual} from "../../../../utils/comparators";


class Notifications extends React.Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false,
            user: {}
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //
    //     const friendRequestsFrom = Object.keys(prevState.user.friendRequestsFrom);
    //     const eventInvitations = Object.keys(prevState.user.eventInvitations);
    //
    //     const newFriendRequestsFrom = Object.keys(nextProps.user.friendRequestsFrom);
    //     const newEventInvitations = Object.keys(nextProps.user.eventInvitations);
    //
    //     // Store prevId in state so we can compare when props change.
    //     // Clear out previously-loaded data (so we don't render stale stuff).
    //     if (!arraysEqual(newFriendRequestsFrom, friendRequestsFrom) || !arraysEqual(newEventInvitations, eventInvitations)) {
    //         return {
    //             dataLoaded: false,
    //             prevId: nextProps.id,
    //         };
    //     }
    //
    //     // No state update necessary
    //     return null;
    //
    // }

    componentDidMount() {
        const friendRequestsFrom = this.props.user.friendRequestsFrom;
        const eventInvitations = this.props.user.eventInvitations;
        this.fetchNotifications(friendRequestsFrom, eventInvitations);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.dataLoaded) {
            const friendRequestsFrom = this.props.user.friendRequestsFrom;
            const eventInvitations = this.props.user.eventInvitations;
            this.fetchNotifications(friendRequestsFrom, eventInvitations);
        }
    }

    fetchNotifications = (friendRequestsFrom, eventInvitations) => {

        if (eventInvitations) {
            eventInvitations = Object.keys(this.props.user.eventInvitations);
        }
        if (friendRequestsFrom) {
            friendRequestsFrom = Object.keys(this.props.user.friendRequestsFrom);
        }

        if (eventInvitations && friendRequestsFrom) {
            this.props.fetchEvents(eventInvitations, () => {
                this.props.fetchUsers(friendRequestsFrom, () => this.setState({dataLoaded: true}), () => {
                })
            }, () => {
            })
        } else if (eventInvitations) {
            this.props.fetchEvents(eventInvitations, () => this.setState({dataLoaded: true}), () => {
            })
        } else if (friendRequestsFrom) {
            this.props.fetchUsers(friendRequestsFrom, () => this.setState({dataLoaded: true}), () => {
            })
        } else {
            this.setState({dataLoaded: true});
        }

    };

    render() {

        if (!this.state.dataLoaded) {
            return <View/>
        }

        // const notifications = [0, 1, 2];
        let friendNotifications = this.props.user.friendRequestsFrom === undefined ? [] : Object.keys(this.props.user.friendRequestsFrom);
        let eventNotifications = this.props.user.eventInvitations === undefined ? [] : Object.keys(this.props.user.eventInvitations);

        friendNotifications = friendNotifications.map(id => {
            if (id in this.props.peopleReducer.byId) {
                return this.props.peopleReducer.byId[id];
            }
            return {}
        });

        return (
            <ScrollView style={styles.container}>
                {
                    friendNotifications.map((user, i) => <FriendRequest key={user.uid} user={user}/>)
                }
                {
                    eventNotifications.map((eventId, i) => <EventInvitation key={eventId}
                                                                            eventId={eventId}/>)
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
        eventReducer: state.eventReducer,
        user: state.authReducer.user
    }
};

export default connect(mapStateToProps, {fetchUsers, fetchEvents})(Notifications);
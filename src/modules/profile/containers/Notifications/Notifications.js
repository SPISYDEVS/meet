import React from 'react';
import {connect} from 'react-redux';

import styles from "./styles"

import {RefreshControl, ScrollView, Text, View} from "react-native";

import FriendRequest from "../../../people/components/FriendRequest/FriendRequest";

import {fetchUsers} from "../../../../network/firebase/user/actions";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import EventInvitation from "../../../event/components/EventInvitation/EventInvitation";
import {arraysEqual} from "../../../../utils/comparators";
import commonStyles from "../../../../styles/commonStyles";


class Notifications extends React.Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false,
            refresh: false
        }
    }

    componentDidMount() {
        const friendRequestsFrom = this.props.user.friendRequestsFrom;
        const eventInvitations = this.props.user.eventInvitations;
        this.fetchNotifications(friendRequestsFrom, eventInvitations);
    }

    fetchNotifications = (friendRequestsFrom, eventInvitations) => {
        this.setState({
            refresh: true
        });

        if (eventInvitations) {
            eventInvitations = Object.keys(this.props.user.eventInvitations);
        }
        if (friendRequestsFrom) {
            friendRequestsFrom = Object.keys(this.props.user.friendRequestsFrom);
        }

        if (eventInvitations && friendRequestsFrom) {
            this.props.fetchEvents(eventInvitations, () => {
                this.props.fetchUsers(friendRequestsFrom, () => this.setState({
                    dataLoaded: true,
                    refresh: false
                }), () => {
                })
            }, () => {
            })
        } else if (eventInvitations) {
            this.props.fetchEvents(eventInvitations, () => this.setState({
                dataLoaded: true,
                refresh: false
            }), () => {
            })
        } else if (friendRequestsFrom) {
            this.props.fetchUsers(friendRequestsFrom, () => this.setState({
                dataLoaded: true,
                refresh: false
            }), () => {
            })
        } else {
            this.setState({
                dataLoaded: true,
                refresh: false
            });
        }

    };

    onRefresh = () => {
        const friendRequestsFrom = this.props.user.friendRequestsFrom;
        const eventInvitations = this.props.user.eventInvitations;
        this.fetchNotifications(friendRequestsFrom, eventInvitations);
    };

    render() {

        if (!this.state.dataLoaded) {
            return <View/>
        }

        let friendNotifications = this.props.user.friendRequestsFrom === undefined ? [] : Object.keys(this.props.user.friendRequestsFrom);
        let eventNotifications = this.props.user.eventInvitations === undefined ? [] : Object.keys(this.props.user.eventInvitations);
        let hasNotifications = friendNotifications.length + eventNotifications.length > 0;

        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refresh}
                        onRefresh={this.onRefresh}
                    />
                }>
                {
                    !hasNotifications &&
                    <View style={commonStyles.emptyContainer}>
                        <Text style={commonStyles.emptyText}>
                            No Notifications
                        </Text>
                    </View>
                }
                {
                    hasNotifications &&
                    friendNotifications.map((userId, i) => <FriendRequest key={userId} userId={userId}/>)
                }
                {
                    hasNotifications &&
                    eventNotifications.map((eventId, i) => <EventInvitation key={eventId} eventId={eventId}/>)
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
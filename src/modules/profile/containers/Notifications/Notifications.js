import React from 'react';
import {connect} from 'react-redux';

import styles from "./styles"

import {ScrollView} from "react-native";
import Notification from "../../components/Notification/Notification";

import FriendRequest from "../../components/FriendRequest/FriendRequest";

import * as userActions from "../../../../network/firebase/User/actions";
const {fetchUsers} = userActions;


class Notifications extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

        if (this.props.user.requestsFrom === undefined) {
            return;
        }

        const receivedFriendRequests = Object.keys(this.props.user.requestsFrom);

        let usersToFetch = [];

        receivedFriendRequests.forEach(id => {
            if (!(id in this.props.peopleReducer.byId)) {
                usersToFetch.push(id);
            }
        });

        if (usersToFetch.length > 0) {
            this.props.fetchUsers(usersToFetch, () => {
            }, () => {
            });
        }

    }

    render() {

        // const notifications = [0, 1, 2];
        let notifications = this.props.user.requestsFrom === undefined ? [] : Object.keys(this.props.user.requestsFrom);

        notifications = notifications.map(id => {
            if (id in this.props.peopleReducer.byId) {
                return this.props.peopleReducer.byId[id];
            }
            return {}
        });

        return (
            <ScrollView style={styles.container}>
                {
                    notifications.map((not, i) => <FriendRequest key={i} user={not}/>)
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
        user: state.authReducer.user
    }
};

export default connect(mapStateToProps, {fetchUsers})(Notifications);
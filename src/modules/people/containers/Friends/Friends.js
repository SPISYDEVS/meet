import React from 'react';
import {connect} from 'react-redux';

import styles from "./styles"

import {ScrollView} from "react-native";

import UserListItem from "../../components/UserListItem/UserListItem";

import {fetchUsers} from "../../../../network/firebase/user/actions";


class Friends extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {

        if (this.props.user.friends === undefined) {
            return;
        }

        const friends = Object.keys(this.props.user.friends);

        let usersToFetch = [];

        friends.forEach(id => {
            if (!(id in this.props.peopleReducer.byId)) {
                usersToFetch.push(id);
            }
        });

        if (usersToFetch.length > 0) {
            console.log("what th eFUCK");

            this.props.fetchUsers(usersToFetch, () => {
            }, () => {
            });
        }

    }

    render() {

        // const friends = [0, 1, 2];
        let friends = this.props.user.friends === undefined ? [] : Object.keys(this.props.user.friends);

        friends = friends.filter(id => this.props.user.friends[id]);
        friends = friends.map(id => {
            if (id in this.props.peopleReducer.byId) {
                return this.props.peopleReducer.byId[id];
            }
            return {}
        });

        return (
            <ScrollView style={styles.container}>
                {
                    friends.map((friend, i) => <UserListItem key={i} user={friend}/>)
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

export default connect(mapStateToProps, {fetchUsers})(Friends);
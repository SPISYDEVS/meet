import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import styles from "./styles"
import {Text} from "react-native";
import PropTypes from 'prop-types';
import {fetchUsers, sendFriendRequest} from "../../actions";
import formStyles from "../../../../styles/formStyles";
import Button from "react-native-elements/src/buttons/Button";

const {View, StyleSheet, Alert} = require('react-native');


class SomeonesProfile extends React.Component {
    constructor() {
        super();
    }

    render() {

        const currentUser = this.props.currentUser;
        let friendshipStatus = null;

        //checks to see if the user is already a friend or has been requested to be a friend already
        //true means they're friends
        //false means current user has requested friendship
        //null means they're literally strangers
        if (currentUser.friends !== undefined && this.props.userId in currentUser.friends) {
            friendshipStatus = currentUser.friends[this.props.userId];
        }

        const user = this.props.people.byId[this.props.userId];

        //lazily load the person's profile
        if (user === undefined) {
            this.props.fetchUsers([this.props.userId], () => {
            }, () => {
            });
            return <View/>
        }

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoContent}>
                        <Avatar
                            height={100}
                            width={100}
                            rounded
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.username}>{user.firstName + " " + user.lastName}</Text>
                            <Text style={styles.school}>{user.school}</Text>
                        </View>
                    </View>
                </View>

                <Button
                    raised
                    title={friendshipStatus === null ? 'ADD AS FRIEND' : friendshipStatus ? 'FRIENDS!' : 'REQUESTED ALREADY'}
                    borderRadius={4}
                    containerViewStyle={formStyles.containerView}
                    buttonStyle={formStyles.button}
                    textStyle={formStyles.buttonText}
                    onPress={() => this.props.sendFriendRequest(this.props.userId, () => {
                    }, () => {
                    })}
                />
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.authReducer.user,
        people: state.peopleReducer
    }
};

const actions = {
    fetchUsers,
    sendFriendRequest,
};

Event.propTypes = {
    userId: PropTypes.string.isRequired
};


export default connect(mapStateToProps, actions)(SomeonesProfile);
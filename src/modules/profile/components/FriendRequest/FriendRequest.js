import React from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {respondToFriendRequest} from "../../../people/actions";
import {connect} from "react-redux";

class FriendRequest extends React.Component {
    constructor() {
        super();
    }

    render() {

        const {user} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>Friend Request</Text>
                    <Text style={styles.description}>
                        {user.firstName + " " + user.lastName + " wants to be your friend!"}
                    </Text>
                </View>
                <TouchableOpacity style={styles.actionButton}
                                  onPress={() => this.props.respondToFriendRequest(user.uid, true, () => {
                                  }, () => {
                                  })}>
                    <Icon name="ios-checkmark-circle-outline" type="ionicon" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}
                                  onPress={() => this.props.respondToFriendRequest(user.uid, false, () => {
                                  }, () => {
                                  })}>
                    <Icon name="ios-close-circle-outline" type="ionicon" size={30}/>
                </TouchableOpacity>
            </View>
        );
    }
}

FriendRequest.propTypes = {
    user: PropTypes.object,
};

const actions = {
    respondToFriendRequest
};


export default connect(null, actions)(FriendRequest);
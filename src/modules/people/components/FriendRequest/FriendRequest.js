import React from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";


import {fetchUser, respondToFriendRequest} from "../../../../network/firebase/user/actions";
import {color} from "../../../../styles/theme";


class FriendRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false
        }
    }

    componentDidMount() {
        const userId = this.props.userId;
        this.fetchUser(userId);
    }

    fetchUser = (userId) => {

        //handle lazily loading event data from firebase if the events aren't loaded into the client yet
        if (!(userId in this.props.peopleReducer.byId)) {
            this.props.fetchUser(userId, () => {
                this.setState({dataLoaded: true});
            }, () => {
            });
        } else {
            this.setState({dataLoaded: true});
        }

    };

    render() {

        if(!this.state.dataLoaded){
            return <View/>
        }

        const userId = this.props.userId;
        const user = this.props.peopleReducer.byId[userId];

        if(user === undefined){
            return <View/>
        }

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
                    <Icon name="ios-checkmark-circle-outline" type="ionicon" size={30} color={color.text}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}
                                  onPress={() => this.props.respondToFriendRequest(user.uid, false, () => {
                                  }, () => {
                                  })}>
                    <Icon name="ios-close-circle-outline" type="ionicon" size={30} color={color.text}/>
                </TouchableOpacity>
            </View>
        );
    }
}

FriendRequest.propTypes = {
    user: PropTypes.object,
};

const actions = {
    respondToFriendRequest,
    fetchUser
};

const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
    }
};

export default connect(mapStateToProps, actions)(FriendRequest);
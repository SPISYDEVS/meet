import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import styles from "./styles"
import {SafeAreaView, Text} from "react-native";
import PropTypes from 'prop-types';

import formStyles from "../../../../styles/formStyles";
import Button from "react-native-elements/src/buttons/Button";
import Modal from "react-native-modal";
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {AVATAR_SIZE} from "../../../profile/constants";


import {fetchUsers, revokeFriendship, sendFriendRequest, getProfileImage} from "../../../../network/firebase/user/actions";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
import {sendPushNotification} from "../../../../network/firebase/pushnotifications/actions";

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');

class SomeonesProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            mVisible: false,
            source: null
        };

        this.handleFriends = this.handleFriends.bind(this);
    }

    componentDidMount() {
        this.fetchProfilePicture();
    }

    handleFriends(fStatus) {
        //if friends
        if (fStatus) {
            
            this.setState({mVisible: true});

        }


        else {

            this.props.sendFriendRequest(this.props.userId, () => {

                const currentUser = this.props.currentUser;
                const name = currentUser.firstName + " " + currentUser.lastName;

                this.props.sendPushNotification([this.props.userId],
                    "Friend Request!",
                    name + " wants to be friends",
                    () => {},
                    (err) => console.log(err)
                );

            }, (err) => console.log(err));

        }

    }


    fetchProfilePicture = () => {
        this.props.getProfileImage(this.props.userId,
            (profile) => {
                this.setState({
                    source: profile.source
                });
            },
            (error) => {
                console.log(error);
            });
    };


    revokeFriendship = () => {
        this.props.revokeFriendship(this.props.userId, () => {
            this.setState({mVisible: false});
        });
    };

    render() {

        const currentUser = this.props.currentUser;
        let friendshipStatus = null;
        let receivingFriendRequest = false;
        let {source} = this.state;

        const user = this.props.people.byId[this.props.userId];

        //lazily load the person's profile
        if (user === undefined) {
            this.props.fetchUsers([this.props.userId], () => {
            }, () => {
            });
            return <View/>
        }

        //checks to see if the user is already a friend or has been requested to be a friend already
        //true means they're friends
        //false means current user has requested friendship
        //null means they're literally strangers
        if (currentUser.friends !== undefined && this.props.userId in currentUser.friends) {
            friendshipStatus = true;
        }
        else if (currentUser.friendRequestsTo !== undefined && this.props.userId in currentUser.friendRequestsTo) {
            friendshipStatus = false;
        }
        //user has received a friend request from that person
        else if (currentUser.friendRequestsFrom !== undefined && this.props.userId in currentUser.friendRequestsFrom) {
            receivingFriendRequest = true;
        }

        return (
            <SafeAreaView style={{flex: 1}}>

                <BackHeader simpleBackChevron/>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoContent}>
                            <Avatar
                                height={AVATAR_SIZE}
                                width={AVATAR_SIZE}
                                rounded
                                source={source === null ? defaultImage : {uri: source}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.username}>{user.firstName + " " + user.lastName}</Text>
                                <Text style={styles.school}>{user.school}</Text>
                            </View>
                        </View>
                    </View>

                    {
                        receivingFriendRequest &&
                        <Text>
                            {user.firstName + " " + user.lastName} has sent you a friend request!
                        </Text>
                    }

                    {
                        !receivingFriendRequest &&
                        <RoundedButton
                            title={friendshipStatus === null ? 'ADD AS FRIEND' : friendshipStatus ? 'FRIENDS!' : 'REQUESTED ALREADY'}
                            onPress={() => this.handleFriends(friendshipStatus)}/>
                    }

                    <Modal style={styles.modal} isVisible={this.state.mVisible}
                           onBackdropPress={() => this.setState({mVisible: false})}>
                        <View style={styles.modalContent}>
                            <View style={styles.main}>
                                <Text style={styles.text}>Are you sure you want to
                                    unfriend {user.firstName + " " + user.lastName}?</Text>
                            </View>
                            <View style={styles.modalBottom}>
                                <TouchableOpacity onPress={() => this.revokeFriendship()}>
                                    <Text style={styles.text}>Unfriend</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({mVisible: false})}>
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </SafeAreaView>
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
    revokeFriendship,
    sendPushNotification,
    getProfileImage
};

SomeonesProfile.propTypes = {
    userId: PropTypes.string.isRequired
};


export default connect(mapStateToProps, actions)(SomeonesProfile);

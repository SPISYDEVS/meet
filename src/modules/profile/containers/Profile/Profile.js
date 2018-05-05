import React from 'react';

const {View, StyleSheet, Alert} = require('react-native');

import {Avatar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { auth as firebaseAuth } from "../../../../config/firebase";
import {Text} from "react-native";
import TabButtons from "../../../event/components/TabButtons/TabButtons";
import Notifications from "../Notifications/Notifications";
import Friends from "../Friends/Friends";
import { ImagePicker } from 'expo';


import {updateProfile} from "../../../../network/firebase/user/actions";
import {signOut} from '../../../../network/firebase/auth/actions';


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
};

class Profile extends React.Component {
    constructor() {
        super();

        const buttons = [
            {
                title: 'Notifications',
                callback: this.setToTab.bind(this),
                selected: true,
            },
            {
                title: 'Friends',
                callback: this.setToTab.bind(this),
                selected: false
            }
        ];

        this.state = {
            buttons: buttons,
        };

        this.setToTab = this.setToTab.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.getImagePermAsync = this.getImagePermAsync.bind(this);
    }

    setToTab(tabKey) {
        const state = {...this.state};
        state.buttons = [];

        //set selected to true for the appropriate tab key
        //set all the other tab key's selected value to false
        this.state.buttons.forEach((button) => {
            state.buttons.push({
                title: button.title,
                callback: this.setToTab.bind(this),
                selected: button.title === tabKey
            })
        });

        this.setState(state);
    }

    async getImagePermAsync(callback) {
        const { Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            this._pickImage(callback);
        } else {
            throw new Error('Location permission not granted');
        }
    }


    _pickImage = async (callback) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            base64: true
        });

        if (!result.cancelled) {
            callback(result);
        }
    };

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onUpdateProfile = () => {
        console.log("done");
    };


    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    onProfilePicPressed = () => {
        this.getImagePermAsync((result) => {
            let source = 'data:image/jpeg;base64, ' + result.base64;
            let user = firebaseAuth.currentUser;
            let data = {
                uid: user.uid,
                profile: {
                    source: source,
                    width: result.width,
                    height: result.height
                }
            };

            this.props.updateProfile(data, this.onUpdateProfile, () => {});
        });
    };

    render() {

        const {user} = this.props;
        var source = '';

        if(user === null){
            return <View/>
        }

        if (user.profile) {
            source = user.profile.source;
        }
        else if (user.photoURL) {
            source = user.photoURL;
        }

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoContent}>
                        <Avatar
                            height={100}
                            width={100}
                            rounded
                            source={{uri: source}}
                            onPress={() => this.onProfilePicPressed()}
                            activeOpacity={0.7}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.username}>{user.firstName + " " + user.lastName}</Text>
                            <Text style={styles.school}>{user.school}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <TabButtons buttons={this.state.buttons}/>

                    <View style={styles.bottomContent}>
                        {this.state.buttons[0].selected && <Notifications/>}
                        {this.state.buttons[1].selected && <Friends/>}

                        <Button
                            raised
                            borderRadius={4}
                            title={'LOG OUT'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={this.onSignOut}/>
                    </View>
                </View>
            </View>
        );
    }


}

export default connect(mapStateToProps, {signOut, updateProfile})(Profile);
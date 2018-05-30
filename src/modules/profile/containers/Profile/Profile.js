import React from 'react';

const {View, StyleSheet, Alert} = require('react-native');

import {Avatar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import {auth as firebaseAuth} from "../../../../config/firebase";
import {SafeAreaView, Text} from "react-native";
import TabButtons from "../../../common/components/TabButtons";
import Notifications from "../Notifications/Notifications";
import Friends from "../../../people/containers/Friends/Friends";
import {ImagePicker, ImageManipulator} from 'expo';
import {AVATAR_SIZE} from "../../constants";


import {updateProfile} from "../../../../network/firebase/user/actions";
import {signOut} from '../../../../network/firebase/auth/actions';
import BackHeader from "../../../common/components/BackHeader/BackHeader";


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
};

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');

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
        const {Permissions} = Expo;
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
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

        console.log(result);
        //resize to optimize performance
        result = await ImageManipulator.manipulate(
            result.uri,
            [{resize: {width: 500}}],
            {
                format: 'jpg',
                base64: true
            }
        );
        console.log(result);

        if (!result.cancelled) {
            callback(result);
        }
    };

    onUpdateProfile = () => {

    };

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

            this.props.updateProfile(data, this.onUpdateProfile, () => {
            });
        });
    };

    generateHeaderProps = () => {

        const rightHeaderButtons = [
            {
                iconName: 'edit-2',
                iconType: 'feather',
                size: 30,
                onPress: () => Actions.push('EditProfile')
            },
            {
                iconName: 'settings',
                iconType: 'feather',
                size: 30,
                onPress: () => Actions.push('Settings')
            },
        ];

        return {
            rightHeaderButtons: rightHeaderButtons
        }

    };

    render() {

        const {user} = this.props;
        let source = '';

        if (user === null) {
            return <View/>
        }

        if (user.profile) {
            source = user.profile.source;
        }

        const headerProps = this.generateHeaderProps();

        return (
            <SafeAreaView style={{flex: 1}}>

                <BackHeader {...headerProps}/>

                <View style={styles.infoContainer}>
                    <View style={styles.infoContent}>
                        <Avatar
                            height={AVATAR_SIZE}
                            width={AVATAR_SIZE}
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
                    <View style={styles.body}>
                        <TabButtons buttons={this.state.buttons}/>

                        <View style={styles.bottomContent}>
                            <View style={this.state.buttons[0].selected ? styles.active : styles.hidden}>
                                <Notifications/>
                            </View>

                            <View style={this.state.buttons[1].selected ? styles.active : styles.hidden}>
                                <Friends/>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }


}

export default connect(mapStateToProps, {signOut, updateProfile})(Profile);
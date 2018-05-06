import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Button, Divider, SocialIcon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {PROFILE_SIZE} from "../../constants";

import {oauthLogin, createUser} from "../../../../network/firebase/auth/actions";
import {fetchEvents} from "../../../../network/firebase/event/actions";


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
};


class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}
    }


    onSignInWithFacebook = async () => {
        this.props.oauthLogin('facebook', (data) => {
            if (!data.exists) {
                let nameArr = data.user.displayName.split(" ");
                let firstName = nameArr[0];
                let lastName = nameArr[1];

                let user = {
                    uid: data.user.uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: data.user.email,
                    profile: {
                        source: `${data.user.photoURL}?width=${PROFILE_SIZE}&height=${PROFILE_SIZE}`,
                        width: PROFILE_SIZE,
                        height: PROFILE_SIZE
                    }
                };
                this.props.createUser(user, this.onFinishedCreatingUser, (error) => {});
            }
            else {
                this.onFinishedCreatingUser();
            }
        }, (error) => {
            console.log(error);
        });
    };


    onFinishedCreatingUser = () => {
        let user = this.props.user;
        if (user.events === undefined) {
            user.events = {};
        }

        this.props.fetchEvents(Object.keys(user.events), this.onSuccess, (error) => {});
    };


    onSuccess = () => {
        Actions.Main();
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={{uri: ""}}/>
                    <Text style={styles.title}>LetsMeet</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <SocialIcon
                            raised
                            button
                            type='facebook'
                            title='SIGN UP WITH FACEBOOK'
                            iconSize={19}
                            style={[styles.containerView, styles.socialButton]}
                            fontStyle={styles.buttonText}
                            onPress={() => this.onSignInWithFacebook()}/>

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>
                                Or
                            </Text>
                        </View>

                        <Button
                            raised
                            borderRadius={4}
                            title={'SIGN UP WITH E-MAIL'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={Actions.Register}/>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={Actions.Login}>
                            <Text style={styles.signInText}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}


export default connect(mapStateToProps, {oauthLogin, fetchEvents, createUser})(Welcome);
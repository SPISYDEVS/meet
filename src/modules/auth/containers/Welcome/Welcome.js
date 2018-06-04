import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View, Animated, Easing, Platform} from 'react-native';

import {Avatar, Button, Divider, Icon, SocialIcon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";
import {PROFILE_SIZE} from "../../constants";

import {oauthLogin, createUser} from "../../../../network/firebase/auth/actions";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import {color} from "../../../../styles/theme";
import {LinearGradient} from "expo";
import TimerMixin from 'react-timer-mixin';
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
const logo = require('../../../../assets/images/logo_circle.png');


const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
};

const backgroundGradient = [color.welcome_gradient1, color.welcome_gradient2, color.welcome_gradient3, color.welcome_gradient4, color.welcome_gradient5, color.welcome_gradient6, color.welcome_gradient7];
const DIRECTION_MAGNITUDE = 0.04;

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0.5,
            direction: DIRECTION_MAGNITUDE,
            background: [color.welcome_gradient1, color.welcome_gradient7],
        }
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
                this.props.createUser(user, this.onFinishedCreatingUser, (error) => {
                });
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

        this.props.fetchEvents(Object.keys(user.events), this.onSuccess, (error) => {
        });
    };


    onSuccess = () => {
        Actions.reset('Main');
    };

    componentDidMount() {
        setInterval(() => {

            let count = this.state.count + this.state.direction;
            let direction = this.state.direction;

            //handle oscillation
            if (count > 1 - DIRECTION_MAGNITUDE) {
                direction = -DIRECTION_MAGNITUDE;
                count = 1;
            } else if (count < DIRECTION_MAGNITUDE) {
                direction = DIRECTION_MAGNITUDE;
                count = 0;
            }

            this.setState({
                count: count,
                direction: direction,
            });
        }, 100);
    }

    render() {

        const start = this.state.count;

        // const background = backgroundGradient.slice(index, backgroundGradient.length).concat(backgroundGradient.slice(0, index));

        return (

            <LinearGradient colors={this.state.background}
                            style={{flex: 1}}
                            start={Platform.OS === 'ios' ? {x:start} : [start, 0]}>

                <SafeAreaView style={styles.container}>

                    <View style={styles.topContainer}>
                        <Avatar
                        height={100}
                        width={100}
                        source={logo}
                        rounded
                        containerStyle={styles.image}
                        />
                        <Text style={styles.title}>LetsMeet</Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonContainer}>
                            <SocialIcon
                                raised
                                button
                                type='facebook'
                                title='SIGN IN WITH FACEBOOK'
                                iconSize={19}
                                style={[styles.containerView, styles.socialButton]}
                                fontStyle={styles.socialButtonText}
                                onPress={() => this.onSignInWithFacebook()}/>

                                <RoundedButton
                                    title={'SIGN UP WITH E-MAIL'}
                                    onPress={Actions.Register}/>
                        </View>

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
                </SafeAreaView>

            </LinearGradient>
        );
    }
}


export default connect(mapStateToProps, {oauthLogin, fetchEvents, createUser})(Welcome);
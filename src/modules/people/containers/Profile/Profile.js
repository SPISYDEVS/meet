import React from 'react';

const {View, StyleSheet, Alert} = require('react-native');

import {Avatar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth, theme} from "../../../auth/index"
import {Text} from "react-native";
import TabButtons from "../../../event/components/TabButtons/TabButtons";

const mapStateToProps = (state) => {
    return {
        peopleById: state.peopleReducer.byId
    }
};

class Profile extends React.Component {
    constructor() {
        super();
    }

    render() {

        const {user} = this.props.peopleById[this.props.userId];

        if(user === null){
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
            </View>
        );
    }
}

export default connect(mapStateToProps, null)(Profile);
import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth, theme} from "../../../auth/index"
import {Text} from "react-native";

const {View, StyleSheet, Alert} = require('react-native');

const {signOut} = auth;

const {color} = theme;

class Friend extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>

                <Avatar rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}/>
                <View style={styles.userInfo}>
                    <Text>Friend!</Text>
                    <Text>School!</Text>
                </View>

            </View>
        );
    }
}

export default connect(null, {signOut})(Friend);
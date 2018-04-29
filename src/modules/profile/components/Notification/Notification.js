import React from 'react';

const {View, StyleSheet, Alert} = require('react-native');

import {Avatar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth, theme} from "../../../auth/index"
import {Text} from "react-native";
import TabButtons from "../../../event/components/TabButtons/TabButtons";

const {signOut} = auth;

const {color} = theme;

class Notification extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Notification!</Text>
                <Text>description</Text>
            </View>
        );
    }
}

export default connect(null, {signOut})(Notification);
import React from 'react';

const {View, StyleSheet, Alert} = require('react-native');

import {Avatar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth, theme} from "../../../auth/index"
import {ScrollView, Text} from "react-native";
import TabButtons from "../../../event/components/TabButtons/TabButtons";
import Notification from "../../components/Notification/Notification";

const {signOut} = auth;

const {color} = theme;

class Notifications extends React.Component {
    constructor() {
        super();
    }

    render() {

        const notifications = [0, 1, 2];

        return (
            <ScrollView style={styles.container}>
                {
                    notifications.map((not, i) => <Notification key={i}/>)
                }
            </ScrollView>
        );
    }
}

export default connect(null, {signOut})(Notifications);
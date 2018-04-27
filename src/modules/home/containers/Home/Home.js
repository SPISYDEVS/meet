import React from 'react';

const {View, StyleSheet, Alert} = require('react-native');

import {SearchBar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import {actions as auth, theme} from "../../../auth/index"
import Event from "../../../event/components/Event/Event";

const {signOut} = auth;

const {color} = theme;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {search: ''};
    }

    render() {

        const events = [{}, {}];

        return (
            <View style={styles.container}>
                {events.map((item) => (
                    <Event
                    />
                ))}
            </View>
        );
    }
}

export default connect(null, {signOut})(Home);
import React from 'react';
const {ScrollView, StyleSheet, Alert} = require('react-native');

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
            <ScrollView style={styles.container}>
                {events.map((item) => (
                    <Event/>
                ))}
            </ScrollView>
        );
    }
}

export default connect(null, {signOut})(Home);
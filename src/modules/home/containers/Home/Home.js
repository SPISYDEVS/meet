import React from 'react';
const { View, StyleSheet, Alert } = require('react-native');

import {SearchBar, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
    constructor(){
        super();
        this.state = {search: ''};
    }



    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme
                    onChangeText={(search) => this.setState({search: search})}
                    onClearText={() => this.setState({search: ''})}
                    placeholder='Type Here...' />
            </View>
        );
    }
}

export default connect(null, { signOut })(Home);
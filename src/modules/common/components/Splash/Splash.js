import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

const logo = require('../../../../assets/images/logo_circle.png');

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={logo}/>
                    <Text style={styles.title}>LetsMeet</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}
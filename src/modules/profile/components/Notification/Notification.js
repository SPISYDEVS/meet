import React from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"

import {Text, View} from "react-native";

class Notification extends React.Component {
    constructor() {
        super();
    }

    render() {

        const {title, description} = this.props;

        return (
            <View style={styles.container}>
                <Text>{title}</Text>
                <Text>{description}</Text>
            </View>
        );
    }
}

Notification.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};


export default Notification;
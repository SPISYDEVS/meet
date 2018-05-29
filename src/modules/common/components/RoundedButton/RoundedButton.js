import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"
import {Button} from "react-native-elements";

class RoundedButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                raised
                title={this.props.title}
                containerViewStyle={[styles.containerView, styles.socialButton]}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={this.props.onPress}/>
        );
    }
}

RoundedButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default RoundedButton;

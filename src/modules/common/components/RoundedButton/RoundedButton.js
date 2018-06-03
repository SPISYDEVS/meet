import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"
import {Button} from "react-native-elements";
import {color} from "../../../../styles/theme";

class RoundedButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                raised
                title={this.props.title}
                containerViewStyle={[styles.containerView, styles.buttonContainer]}
                buttonStyle={this.props.disabled ? [styles.button, styles.disabled] : styles.button}
                disabled={this.props.disabled}
                textStyle={[styles.buttonText, {color: this.props.textColor}]}
                onPress={this.props.onPress}/>
        );
    }
}

RoundedButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    textColor: PropTypes.string,
};

RoundedButton.defaultProps = {
    textColor: color.background,
    disabled: false,
};

export default RoundedButton;

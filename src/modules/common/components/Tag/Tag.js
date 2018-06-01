import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from "./styles"
import {Button, Icon} from "react-native-elements";
import {color, normalize} from "../../../../styles/theme";
import {Text, TouchableOpacity} from "react-native";

class Tag extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.containerView, styles.buttonContainer]}
                              onPress={this.props.onPress}>
                <Text style={[styles.buttonText, {color: this.props.textColor}]}>
                    {this.props.title}
                </Text>
                {
                    this.props.editMode &&
                    <Icon name='x' type='feather' color={color.background} size={normalize(14)}/>
                }
            </TouchableOpacity>
        );
    }
}

Tag.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    editMode: PropTypes.bool,
};

Tag.defaultProps = {
    textColor: color.background,
    editMode: true
};

export default Tag;

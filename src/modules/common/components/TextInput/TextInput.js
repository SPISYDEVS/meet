import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../../event/utils/validate'
import styles from "./styles"
import {color} from "../../../../styles/theme";
import formStyles from "../../../../styles/formStyles";

class TextInput extends Component {
    render() {
        const { showLabel, placeholder, autoFocus, onChangeText, secureTextEntry, multiline } = this.props;

        return (
            <View>
                {
                    (showLabel) &&
                    <FormLabel>{this.props.label}</FormLabel>
                }
                <FormInput
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    underlineColorAndroid={"#fff"}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    containerStyle={styles.container}
                    inputStyle={[styles.inputContainer, this.props.inputStyle]}
                    selectionColor={color.text}
                    placeholderTextColor={color.text}
                    multiline={multiline}
                    value={this.props.value}
                />
                {
                    (!isEmpty(this.props.error)) &&
                    <FormValidationMessage labelStyle={formStyles.errorText}>
                        {this.props.error}
                    </FormValidationMessage>
                }
            </View>
        );
    }
}

TextInput.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    inputStyle: PropTypes.obj,
};

TextInput.defaultProps = {
    autoFocus: false,
    secureTextEntry: false,
    multiline: false,
    inputStyle: {}
};

export default TextInput;
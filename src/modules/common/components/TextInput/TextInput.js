import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../../event/utils/validate'
import styles from "./styles"

class TextInput extends Component {
    render() {
        const { showLabel, placeholder, autoFocus, onChangeText, secureTextEntry, multiline } = this.props;

        return (
            <View style={styles.container}>
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
                    inputStyle={styles.inputContainer}
                    multiline={multiline}
                    value={this.props.value}
                />
                {
                    (!isEmpty(this.props.error)) &&
                    <FormValidationMessage>
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
};

TextInput.defaultProps = {
    autoFocus: false,
    secureTextEntry: false,
    multiline: false,
};

export default TextInput;
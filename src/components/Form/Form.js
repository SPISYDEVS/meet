import React from 'react';
import PropTypes from 'prop-types'

import {Text, View} from 'react-native';
import {Button} from 'react-native-elements'

import {isEmpty} from '../../utils/validate'

import styles from "./styles"

import TextInput from "../TextInput"
import DatePicker from "react-native-datepicker";

class Form extends React.Component {
    constructor(props) {
        super(props);

        const {fields, error} = props;

        this.state = this.createState(fields, error);

        //bind functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createState(fields, error) {
        //create the state
        const state = {};
        fields.forEach((field) => {
            let {key, type, value} = field;
            state[key] = {type: type, value: value};
        });

        state["error"] = error;

        return state;
    }

    onSubmit() {
        const data = this.state;
        const result = this.props.validate(data);

        if (!result.success) this.setState({error: result.error});
        else this.props.onSubmit(this.extractData(data));
    }

    extractData(data) {
        const retData = {};

        Object.keys(data).forEach(function (key) {
            if (key !== "error") {
                let {value} = data[key];
                retData[key] = value;
            }
        });

        return retData;
    }

    onChange(key, text) {
        const state = this.state;
        state[key]['value'] = text;
        this.setState(state);
    }

    render() {
        const {fields, showLabel, buttonTitle, onForgotPassword} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {
                        (!isEmpty(this.state.error['general'])) &&
                        <Text style={styles.errorText}>{this.state.error['general']}</Text>
                    }

                    {
                        fields.map((data, idx) => {

                            if(data.input === "text") {
                                let {key, label, placeholder, autoFocus, secureTextEntry, multiline} = data;
                                return (
                                    <TextInput key={key}
                                               label={label}
                                               showLabel={showLabel}
                                               placeholder={placeholder}
                                               autoFocus={autoFocus}
                                               onChangeText={(text) => this.onChange(key, text)}
                                               secureTextEntry={secureTextEntry}
                                               multiline={multiline}
                                               value={this.state[key]['value']}
                                               error={this.state.error[key]}/>
                                )
                            } else if(data.input === "date"){
                                let {key, options} = data;
                                return (
                                    <DatePicker
                                        key={key}
                                        style={{width: 200}}
                                        date={this.state[key]['value']}
                                        mode="date"
                                        placeholder="select date"
                                        // format={dateOption.format !== undefined ? dateOption.format : "YYYY-MM-DD"}
                                        format="YYYY-MM-DD"
                                        minDate="2010-01-01"
                                        maxDate="2060-01-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 18
                                            }
                                            // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => {
                                            this.onChange(key, date)
                                        }}
                                        {...options}
                                    />
                                )
                            }
                        })
                    }

                    <Button
                        raised
                        title={buttonTitle}
                        borderRadius={4}
                        containerViewStyle={styles.containerView}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.onSubmit}/>

                    {
                        this.props.onForgotPassword !== null &&
                        <Text style={styles.forgotText} onPress={onForgotPassword}>
                            Forgot password?</Text>
                    }

                </View>
            </View>
        );
    }
}

Form.propTypes = {
    fields: PropTypes.array,
    showLabel: PropTypes.bool,
    buttonTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.object,
};


Form.defaultProps = {
    onForgotPassword: null,
};


export default Form;
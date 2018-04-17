import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from "../../index"

const {resetPassword} = auth;

import Form from "../../../../components/Form"
import {validate} from '../../utils/validate'

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        multiline: false,
        type: "email",
        input: "text"
    }
];

const error = {
    general: "",
    email: ""
}

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.resetPassword(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        alert("Password Reminder Sent")
        Actions.pop();
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <Form fields={fields}
                  onSubmit={this.onSubmit}
                  buttonTitle={"SUBMIT"}
                  error={this.state.error}
                  validate={validate}/>
        );
    }
}

export default connect(null, {resetPassword})(ForgotPassword);
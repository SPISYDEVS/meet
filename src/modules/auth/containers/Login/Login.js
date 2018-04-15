import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from "../../index"
import {actions as event} from "../../../event/index"

import Form from "../../../../components/Form"
import {validate} from '../../utils/validate'

const {login} = auth;
const {loadEvents} = event;


const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        multiline: false,
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        multiline: false,
        type: "password"
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onForgotPassword() {
        Actions.ForgotPassword()
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.props.login(data, this.onLogin, this.onError)
    }

    onLogin({exists, user}){
        console.log(user);
        if (exists) this.props.loadEvents(Object.keys(user.events), this.onSuccess, () => {});
        else Actions.CompleteProfile({user});

    }

    onSuccess() {
        Actions.Main();
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
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"LOG IN"}
                  error={this.state.error}
                  onForgotPassword={this.onForgotPassword}
                  validate={validate}/>
        );
    }
}

export default connect(null, {login, loadEvents})(Login);
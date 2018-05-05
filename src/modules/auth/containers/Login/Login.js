import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {isEmpty} from '../../utils/validate';
import {createState, extractData, hasErrors} from "../../../../components/utils/formUtils";
import formStyles from "../../../../styles/formStyles";
import Button from "react-native-elements/src/buttons/Button";
import {Text, TouchableOpacity, View} from "react-native";
import TextInput from "../../../../components/TextInput/TextInput";

import {login} from '../../../../network/firebase/auth/actions';
import {fetchEvents} from '../../../../network/firebase/event/actions';


class Login extends React.Component {
    constructor() {
        super();

        this.fields = {
            'email': {
                label: 'email',
                placeholder: 'Email',
                type: 'text',
                validator: (email) => !isEmpty(email),
                errorMessage: 'Email is required'
            },
            'password': {
                label: 'password',
                placeholder: 'Password',
                type: "text",
                secureTextEntry: true,
                validator: (password) => !isEmpty(password),
                errorMessage: 'Password is required'
            },
        };

        this.state = createState(this.fields);
    }

    onForgotPassword = () => {
        Actions.ForgotPassword()
    };

    onSubmit = () => {
        const data = extractData(this.state);
        this.setState({error: data['error']});

        if (!hasErrors(data['error'])) {
            this.props.login(data['data'], this.onLogin, this.onError)
        }
    };

    onLogin = ({exists, user}) => {
        if (exists) {
            if (user.events === undefined) {
                user.events = {};
            }
            this.props.fetchEvents(Object.keys(user.events), this.onSuccess, () => {
            });
        }
        else Actions.CompleteProfile({user});

    };

    onSuccess = () => {
        Actions.Main();
    };

    onError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = 'These credentials do not match any of our records';
        }

        this.setState({error: errObj});
    };

    onChange = (key, text) => {
        const state = {...this.state};
        state[key]['value'] = text;
        this.setState(state);
    };

    render() {

        const [email, password] = Object.keys(this.fields);

        return (
            <View style={formStyles.container}>

                {
                    (!isEmpty(this.state.error['general'])) &&
                    <Text style={formStyles.errorText}>{this.state.error['general']}</Text>
                }

                <TextInput
                    {...this.fields[email]}
                    onChangeText={(text) => this.onChange(email, text)}
                    value={this.state[email]['value']}
                    error={this.state.error[email]}/>

                <TextInput
                    {...this.fields[password]}
                    onChangeText={(text) => this.onChange(password, text)}
                    value={this.state[password]['value']}
                    error={this.state.error[password]}/>

                <Button
                    raised
                    title='Sign In'
                    borderRadius={4}
                    containerViewStyle={formStyles.containerView}
                    buttonStyle={formStyles.button}
                    textStyle={formStyles.buttonText}
                    onPress={this.onSubmit}/>

                <TouchableOpacity
                    onPress={this.onForgotPassword}>
                    <Text style={formStyles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default connect(null, {login, fetchEvents})(Login);
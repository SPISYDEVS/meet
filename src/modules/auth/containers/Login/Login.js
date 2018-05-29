import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {isEmpty} from '../../utils/validate';
import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";
import formStyles from "../../../../styles/formStyles";
import Button from "react-native-elements/src/buttons/Button";
import {Text, TouchableOpacity, View} from "react-native";
import TextInput from "../../../common/components/TextInput/TextInput";

import {login} from '../../../../network/firebase/auth/actions';
import {fetchEvents} from '../../../../network/firebase/event/actions';
import styles from "./styles";
import {LinearGradient} from "expo";
import {color} from "../../../../styles/theme";
import commonStyles from "../../../../styles/commonStyles";
import headerStyles from "../../../../styles/headerStyles";
import {Icon} from "react-native-elements";
import BackHeader from "../../../common/components/BackHeader/BackHeader";


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
        Actions.reset("Main");
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

        const backgroundGradient = [color.welcome_gradient1, color.welcome_gradient7];

        return (
            <LinearGradient colors={backgroundGradient}
                            style={{flex: 1}}>

                <BackHeader simpleBackX/>

                <View style={styles.container}>

                    {
                        (!isEmpty(this.state.error['general'])) &&
                        <Text style={formStyles.errorText}>{this.state.error['general']}</Text>
                    }

                    <View style={styles.formInputsContainer}>
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
                    </View>

                    <Button
                        raised
                        title='Sign In'
                        containerViewStyle={styles.containerView}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.onSubmit}/>

                    <TouchableOpacity
                        onPress={this.onForgotPassword}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
        );
    }
}

export default connect(null, {login, fetchEvents})(Login);
import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";
import {Keyboard, TouchableWithoutFeedback, View} from "react-native";
import TextInput from "../../../common/components/TextInput";

import {isEmpty} from "../../../../utils/validate";
import {resetPassword} from '../../../../network/firebase/auth/actions';
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
import {LinearGradient} from "expo";
import {color} from "../../../../styles/theme";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import styles from "./styles";

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.fields = {
            'email': {
                label: "Email Address",
                placeholder: "Email",
                type: "email",
                validator: (email) => !isEmpty(email),
                errorMessage: 'Email is required'
            }
        };
        this.state = createState(this.fields);
    }

    onSubmit = () => {
        const data = extractData(this.state);
        this.setState({error: data['error']});

        if (!hasErrors(data['error'])) {
            this.props.resetPassword(data['data'], this.onSuccess, this.onError)
        }
    };

    onSuccess = () => {
        alert("Password Reminder Sent");
        Actions.pop();
    };

    onError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['email'] = error.message;
        }

        this.setState({error: errObj});
    };

    onChange = (key, text) => {
        const state = {...this.state};
        state[key]['value'] = text;
        this.setState(state);
    };

    render() {

        const [email] = Object.keys(this.fields);
        const backgroundGradient = [color.welcome_gradient1, color.welcome_gradient7];

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <LinearGradient colors={backgroundGradient}
                                style={{flex: 1}}>

                    <BackHeader simpleBackX/>

                    <View style={styles.container}>

                    <TextInput
                        {...this.fields[email]}
                        onChangeText={(text) => this.onChange(email, text)}
                        value={this.state[email]['value']}
                        error={this.state.error[email]}/>

                    {/*<Button*/}
                    {/*raised*/}
                    {/*title='Complete'*/}
                    {/*borderRadius={4}*/}
                    {/*containerViewStyle={formStyles.containerView}*/}
                    {/*buttonStyle={formStyles.button}*/}
                    {/*textStyle={formStyles.buttonText}*/}
                    {/*onPress={this.onSubmit}/>*/}
                    <RoundedButton
                        title={'Complete'}
                        onPress={this.onSubmit}/>

                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect(null, {resetPassword})(ForgotPassword);
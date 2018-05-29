import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";
import {View} from "react-native";
import TextInput from "../../../common/components/TextInput";
import Button from "react-native-elements/src/buttons/Button";
import formStyles from "../../../../styles/formStyles";


import {resetPassword} from '../../../../network/firebase/auth/actions';
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";


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
            errObj['general'] = error.message;
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

        return (
            <View style={formStyles.container}>

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
        );
    }
}

export default connect(null, {resetPassword})(ForgotPassword);
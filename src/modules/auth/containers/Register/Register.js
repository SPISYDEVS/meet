import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {confirmPassword, isEmpty} from '../../utils/validate'
import {createState, extractData, hasErrors} from "../../../../components/utils/formUtils";
import formStyles from "../../../../styles/formStyles";
import TextInput from "../../../../components/TextInput/TextInput";
import {Text, View} from "react-native";
import Button from "react-native-elements/src/buttons/Button";

import {register} from '../../../../network/firebase/auth/actions';


class Register extends React.Component {
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
            'confirmPassword': {
                label: 'confirmPassword',
                placeholder: 'Confirm Password',
                type: "text",
                secureTextEntry: true,
            },
        };

        this.state = createState(this.fields);
    }

    onSubmit = () => {
        const data = extractData(this.state);

        const password = data['data']['password'];
        const confPassword = data['data']['confirmPassword'];

        if(!confirmPassword(confPassword, password)){
            data['error']['confirmPassword'] = 'Confirmation password must match'
        }

        this.setState({error: data['error']});

        if (!hasErrors(data['error'])) {
            this.props.register(data['data'], this.onSuccess, this.onError)
        }
    };

    onSuccess = () => {
        Actions.Login()
    };

    onError = (error) => {
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
    };

    onChange = (key, text) => {
        const state = {...this.state};
        state[key]['value'] = text;
        this.setState(state);
    };

    render() {

        const [email, password, confirmPassword] = Object.keys(this.fields);

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

                <TextInput
                    {...this.fields[confirmPassword]}
                    onChangeText={(text) => this.onChange(confirmPassword, text)}
                    value={this.state[confirmPassword]['value']}
                    error={this.state.error[confirmPassword]}/>

                <Button
                    raised
                    title='Complete'
                    borderRadius={4}
                    containerViewStyle={formStyles.containerView}
                    buttonStyle={formStyles.button}
                    textStyle={formStyles.buttonText}
                    onPress={this.onSubmit}/>

            </View>
        );
    }
}

export default connect(null, {register})(Register);
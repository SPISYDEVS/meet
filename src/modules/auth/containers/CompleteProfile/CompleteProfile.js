import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {isEmpty} from '../../utils/validate'
import TextInput from "../../../../components/TextInput";
import ItemSelector from "../../../../components/ItemSelector";
import {createState, extractData, hasErrors} from "../../../../components/utils/formUtils";

import {View} from "react-native";
import formStyles from '../../../../styles/formStyles';
import {Button} from "react-native-elements";

import {createUser} from '../../../../network/firebase/auth/actions';


class CompleteProfile extends React.Component {
    constructor() {
        super();

        this.fields = {
            'firstName': {
                label: 'firstName',
                placeholder: 'First Name',
                type: 'text',
                validator: (name) => !isEmpty(name),
                errorMessage: 'First name is required'
            },
            'lastName': {
                label: 'lastName',
                placeholder: 'Last Name',
                type: "text",
                validator: (name) => !isEmpty(name),
                errorMessage: 'Last name is required'
            },
            'school': {
                objList: [
                    {
                        title: 'UCI',
                        value: 'UCI'
                    },
                    {
                        title: 'UCSD',
                        value: 'UCSD'
                    },
                    {
                        title: 'UCSB',
                        value: 'UCSB'
                    },
                    {
                        title: 'UCLA',
                        value: 'UCLA'
                    },
                ],
                searchHint: 'Choose a school',
                callback: (value) => this.onChange('school', value),
                validator: (value) => !isEmpty(value) && value !== 'Choose a school',
                errorMessage: 'You must choose a school'
            }
        };

        this.state = createState(this.fields);

    }

    onSubmit = () => {
        const data = extractData(this.state);
        this.setState({error: data['error']});

        if (!hasErrors(data['error'])) {
            //attach user id
            const {user} = this.props;
            data['data']['uid'] = user.uid;

            this.props.createUser(data['data'], this.onSuccess, this.onError);
        }
    };

    onSuccess = () => {
        Actions.Main()
    };

    onError = (error) => {
        let errObj = {};

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

        const [firstName, lastName, school] = Object.keys(this.fields);
        return (
            <View style={formStyles.container}>

                <TextInput
                    {...this.fields[firstName]}
                    onChangeText={(text) => this.onChange(firstName, text)}
                    value={this.state[firstName]['value']}
                    error={this.state.error[firstName]}/>

                <TextInput
                    {...this.fields[lastName]}
                    onChangeText={(text) => this.onChange(lastName, text)}
                    value={this.state[lastName]['value']}
                    error={this.state.error[lastName]}/>

                <ItemSelector
                    {...this.fields[school]}
                    value={this.state[school]['value']}
                    error={this.state.error[school]}
                />

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

export default connect(null, {createUser})(CompleteProfile);

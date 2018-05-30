import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {isEmpty} from '../../utils/validate'
import TextInput from "../../../common/components/TextInput";
import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";

import {Keyboard, TouchableWithoutFeedback, View} from "react-native";

import {createUser} from '../../../../network/firebase/auth/actions';
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import {LinearGradient} from "expo";
import {color} from "../../../../styles/theme";
import styles from "./styles";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
import SchoolSelection from "../../../search/containers/SchoolSelection/SchoolSelection";

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
        Actions.reset('Main');
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
        const backgroundGradient = [color.welcome_gradient1, color.welcome_gradient7];

        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient colors={backgroundGradient}
                                style={{flex: 1}}>

                    <BackHeader simpleBackChevron/>

                    <View style={styles.container}>

                        <View style={styles.formInputsContainer}>

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

                            <SchoolSelection
                                {...this.fields[school]}
                                value={this.state[school]['value']}
                                error={this.state.error[school]}
                            />

                        </View>

                        <RoundedButton
                            title={'Complete'}
                            onPress={this.onSubmit}/>

                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect(null, {createUser})(CompleteProfile);

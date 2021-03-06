import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {isEmpty} from '../../../auth/utils/validate'
import TextInput from "../../../common/components/TextInput";
import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";

import {SafeAreaView, View, Keyboard, TouchableWithoutFeedback} from "react-native";
import formStyles from '../../../../styles/formStyles';

import {updateProfile} from "../../../../network/firebase/user/actions";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
import SchoolSelection from "../../../search/containers/SchoolSelection/SchoolSelection";


const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    }
};

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        const user = this.props.authReducer.user;

        this.fields = {
            'firstName': {
                label: 'firstName',
                placeholder: 'First Name',
                type: 'text',
                value: user.firstName,
                validator: (name) => !isEmpty(name),
                errorMessage: 'First name is required'
            },
            'lastName': {
                label: 'lastName',
                placeholder: 'Last Name',
                type: "text",
                value: user.lastName,
                validator: (name) => !isEmpty(name),
                errorMessage: 'Last name is required'
            },
            'school': {
                searchHint: 'Choose a school',
                value: user.school,
                callback: (value) => this.onChange('school', value),
                validator: (value) => !isEmpty(value) && value !== 'Choose a school',
                errorMessage: 'You must choose a school'
            }
        };

        this.state = createState(this.fields);

    }

    onSubmit = () => {
        const data = extractData(this.state);

        if (hasErrors(data['error'])) {
            this.setState({error: data['error']});
        } else {
            //attach user id
            const user = this.props.authReducer.user;
            data['data']['uid'] = user.uid;
            this.props.updateProfile(data['data'], this.onSuccess, () => {
            })
        }
    };

    onSuccess = () => {
        Actions.Profile()
    };

    onChange = (key, text) => {
        const state = {...this.state};
        state[key]['value'] = text;
        this.setState(state);
    };

    render() {

        const [firstName, lastName, school] = Object.keys(this.fields);
        return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <SafeAreaView style={{flex: 1}}>

                    <BackHeader simpleBackChevron/>

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

                        <SchoolSelection
                            {...this.fields[school]}
                            value={this.state[school]['value']}
                            error={this.state.error[school]}
                        />

                        <RoundedButton
                            title={'Update'}
                            onPress={this.onSubmit}/>

                    </View>
                </SafeAreaView>

            </TouchableWithoutFeedback>

        );
    }
}

export default connect(mapStateToProps, {updateProfile})(EditProfile);

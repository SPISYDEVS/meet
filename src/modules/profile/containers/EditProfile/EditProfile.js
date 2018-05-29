import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {isEmpty} from '../../../auth/utils/validate'
import TextInput from "../../../common/components/TextInput";
import ItemSelector from "../../../common/components/ItemSelector";
import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";

import {SafeAreaView, View} from "react-native";
import formStyles from '../../../../styles/formStyles';
import {Button} from "react-native-elements";

import {updateProfile} from "../../../../network/firebase/user/actions";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import styles from "./styles";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";


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

                    <ItemSelector
                        {...this.fields[school]}
                        value={this.state[school]['value']}
                        error={this.state.error[school]}
                    />

                    {/*<Button*/}
                    {/*raised*/}
                    {/*title='Update'*/}
                    {/*borderRadius={4}*/}
                    {/*containerViewStyle={formStyles.containerView}*/}
                    {/*buttonStyle={formStyles.button}*/}
                    {/*textStyle={formStyles.buttonText}*/}
                    {/*onPress={this.onSubmit}/>*/}
                    <RoundedButton
                        title={'Update'}
                        onPress={this.onSubmit}/>

                </View>
            </SafeAreaView>

        );
    }
}

export default connect(mapStateToProps, {updateProfile})(EditProfile);

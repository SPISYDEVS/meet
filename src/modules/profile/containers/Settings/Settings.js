import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {View} from "react-native";
import formStyles from '../../../../styles/formStyles';
import {Button} from "react-native-elements";

import {updateProfile} from "../../../../network/firebase/user/actions";
import {Alert} from "react-native";

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    }
};

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    onSignOut = () => {
        this.props.signOut(this.onSuccess, this.onError)
    };

    onSuccess = () => {
        Actions.reset("Auth")
    };

    onError = (error) => {
        Alert.alert('Oops!', error.message);
    };

    render() {

        return (
            <View style={formStyles.container}>

                <Button
                    raised
                    title={'LOG OUT'}
                    borderRadius={4}
                    containerViewStyle={formStyles.containerView}
                    buttonStyle={formStyles.button}
                    textStyle={formStyles.buttonText}
                    onPress={this.onSignOut}/>

            </View>

        );
    }
}

export default connect(mapStateToProps, {updateProfile})(Settings);

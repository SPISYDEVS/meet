import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {SafeAreaView, Text, View} from "react-native";
import formStyles from '../../../../styles/formStyles';
import {Button, Slider} from "react-native-elements";

import {updateProfile} from "../../../../network/firebase/user/actions";
import {signOut} from "../../../../network/firebase/auth/actions";
import {Alert} from "react-native";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";

import styles from "./styles";

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    }
};

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        this.setState({...this.props.authReducer.settings})
    };

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
            <SafeAreaView style={{flex: 1}}>

                <BackHeader simpleBackChevron/>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Settings
                    </Text>
                </View>

                <View style={styles.sliderContainer}>
                    <Slider
                        minimumValue={0.5}
                        maximumValue={100}
                        step={0.5}
                        value={this.state.fetchingDistance}
                        onValueChange={(fetchingDistance) => this.setState({fetchingDistance})}
                    />
                    <Text style={styles.sliderText}>Value: {this.state.fetchingDistance}</Text>
                </View>

                    <View style={styles.buttonContainer}>

                        <RoundedButton
                            title={'LOG OUT'}
                            onPress={this.onSignOut}/>

                    </View>

            </SafeAreaView>

        );
    }
}

export default connect(mapStateToProps, {updateProfile, signOut})(Settings);

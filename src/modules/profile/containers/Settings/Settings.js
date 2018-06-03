import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {SafeAreaView, Text, View} from "react-native";
import formStyles from '../../../../styles/formStyles';
import {Button, Slider} from "react-native-elements";

import {updateProfile} from "../../../../network/firebase/user/actions";
import {signOut, updateSettings} from "../../../../network/firebase/auth/actions";
import {Alert} from "react-native";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";

import styles from "./styles";
import {debounce} from "lodash";

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    }
};

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.debouncedUpdateSettings = debounce(this.updateSettings, 400);
    }

    componentDidMount(){
        this.setState({...this.props.authReducer.settings});
    }

    onSignOut = () => {
        this.props.signOut(this.props.authReducer.settings, this.onSuccess, this.onError)
    };

    onSuccess = () => {
        Actions.reset("Auth")
    };

    onError = (error) => {
        Alert.alert('Oops!', error.message);
    };

    updateSettings = () => {
        this.props.updateSettings(this.state);
    };

    changeFetchingDistance = (newValue) => {
        this.setState({fetchingDistance: newValue});
        this.debouncedUpdateSettings();
    };

    render() {

        const fetchingDistance = this.state.fetchingDistance;

        return (
            <SafeAreaView style={{flex: 1}}>

                <BackHeader simpleBackChevron/>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Settings
                    </Text>
                </View>

                <View style={styles.settingsContainer}>
                <View style={styles.sliderContainer}>
                    <Slider
                        minimumValue={1}
                        maximumValue={100}
                        step={1}
                        value={fetchingDistance}
                        onValueChange={this.changeFetchingDistance}
                    />
                    <Text style={styles.sliderText}>Only search for events {fetchingDistance} miles away from me</Text>
                </View>
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

export default connect(mapStateToProps, {updateProfile, updateSettings, signOut})(Settings);

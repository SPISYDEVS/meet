import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SafeAreaView, TouchableOpacity, View} from 'react-native';

import styles from "./styles"
import Modal from "react-native-modal";
import SingleSelection from "../../components/SingleSelection";
import {FormLabel, FormValidationMessage} from "react-native-elements";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import {Actions} from 'react-native-router-flux';

const schools = [
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
];

class SchoolSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {visibleModal: false};
    }

    selectItem = (value) => {
        this.props.callback(value);
        this.setState({visibleModal: false});
    };

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setState({visibleModal: true})}>
                    <FormLabel containerStyle={styles.labelContainer} labelStyle={styles.inputContainer}>
                        {this.props.value.length > 0 ? this.props.value : this.props.searchHint}
                    </FormLabel>
                </TouchableOpacity>

                {
                    !!(this.props.error && this.props.error.length > 0) &&
                    <FormValidationMessage>
                        {this.props.error}
                    </FormValidationMessage>
                }

                <Modal
                    isVisible={this.state.visibleModal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    style={styles.modal}
                >
                    <SafeAreaView style={styles.modalContainer}>

                        <BackHeader
                            leftHeaderButtons={[{
                                iconName: 'x',
                                iconType: 'feather',
                                onPress: () => this.setState({visibleModal: false})
                            }]}/>

                        <SingleSelection
                            iconName="university"
                            iconType="font-awesome"
                            objList={schools}
                            {...this.props}
                            callback={(value) => this.selectItem(value)}
                        />
                    </SafeAreaView>
                </Modal>
            </View>
        );
    }
}

SchoolSelection.propTypes = {
    value: PropTypes.string.isRequired,
    searchHint: PropTypes.string,
    callback: PropTypes.func
};

export default SchoolSelection;

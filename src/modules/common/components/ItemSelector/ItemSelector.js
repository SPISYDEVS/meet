import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TouchableOpacity, View} from 'react-native';

import styles from "./styles"
import Modal from "react-native-modal";
import Selection from "../Selection/Selection";
import {FormLabel, FormValidationMessage} from "react-native-elements";

class ItemSelector extends Component {
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
                    <FormLabel>
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
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    onBackdropPress={() => this.setState({visibleModal: false})}
                >
                    <View><Selection {...this.props} callback={(value) => this.selectItem(value)}/></View>
                </Modal>
            </View>
        );
    }
}

ItemSelector.propTypes = {
    objList: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    searchHint: PropTypes.string,
    callback: PropTypes.func
};

export default ItemSelector;

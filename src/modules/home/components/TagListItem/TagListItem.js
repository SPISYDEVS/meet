import React from 'react';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import {color} from "../../../../styles/theme";

class TagListItem extends React.PureComponent {
    constructor() {
        super();
    }

    handlePress = () => {
        Actions.push('TagDetails', {title: this.props.tag});
    };

    render() {

        const tag = this.props.tag;

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.handlePress()}>

                <Icon name='hash' type='feather' color={color.white} size={20}/>

                <View style={styles.eventInfo}>

                    <Text style={styles.title} numberOfLines={1}>{tag}</Text>

                </View>

            </TouchableOpacity>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
    }
};

export default connect(mapStateToProps, null)(TagListItem);
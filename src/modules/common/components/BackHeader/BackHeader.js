import React from 'react';
import {Actions} from 'react-native-router-flux';
import headerStyles from "../../../../styles/headerStyles";
import {color} from "../../../../styles/theme";
import {Icon} from "react-native-elements";
import {SafeAreaView, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

class BackHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={headerStyles.backHeader}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name={this.props.x ? 'x' : 'chevron-left'} type='feather' color={color.text} size={40}/>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

BackHeader.propTypes = {
    x: PropTypes.bool
};

BackHeader.defaultProps = {
    x: false
};

export default BackHeader;
import React from 'react';
import {Actions} from 'react-native-router-flux';
import headerStyles from "../../../../styles/headerStyles";
import {color} from "../../../../styles/theme";
import {Icon} from "react-native-elements";
import {SafeAreaView, TouchableOpacity, View} from "react-native";

class BackHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={headerStyles.navBar}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <Icon name='chevron-left' type='feather' color={color.text} size={40}/>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default BackHeader;
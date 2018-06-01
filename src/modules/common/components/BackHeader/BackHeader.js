import React from 'react';
import {Actions} from 'react-native-router-flux';
import headerStyles from "../../../../styles/headerStyles";
import {color} from "../../../../styles/theme";
import {Icon} from "react-native-elements";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

class BackHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        /* buttons are obj structured as
            {   iconName: 'name',
                iconType: 'type',
                size: 'size',
                onPress: 'func',
            }
        */
        const leftButtons = this.props.leftHeaderButtons;
        const rightButtons = this.props.rightHeaderButtons;

        return (
            <SafeAreaView style={styles.backHeader}>
                <View style={styles.leftHeader}>
                    {
                        this.props.simpleBackChevron &&
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Icon name='chevron-thin-left' type='entypo' color={color.text} size={25}/>
                        </TouchableOpacity>
                    }
                    {
                        (this.props.simpleBackX && !this.props.simpleBackChevron) &&
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Icon name='x' type='feather' color={color.text} size={30}/>
                        </TouchableOpacity>
                    }
                    {
                        leftButtons.map(button => {

                            const {iconName, iconType, size, onPress} = button;

                            return (
                                <TouchableOpacity key={iconName} style={styles.leftButtonPadding} onPress={onPress}>
                                    <Icon name={iconName} type={iconType} color={color.text}
                                          size={size}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.rightHeader}>
                    {
                        rightButtons.map(button => {

                            const {iconName, iconType, size, onPress} = button;

                            return (
                                <TouchableOpacity key={iconName} style={styles.rightButtonPadding} onPress={onPress}>
                                    <Icon name={iconName} type={iconType} color={color.text}
                                          size={size}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </SafeAreaView>
        )
    }
}

BackHeader.propTypes = {
    simpleBackX: PropTypes.bool,
    simpleBackChevron: PropTypes.bool,
    leftHeaderButtons: PropTypes.array,
    rightHeaderButtons: PropTypes.array,
};

BackHeader.defaultProps = {
    simpleBackX: false,
    simpleBackChevron: false,
    leftHeaderButtons: [],
    rightHeaderButtons: []
};

export default BackHeader;
import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import handleViewProfile from "../../utils/handleViewProfile";
import {fontSize} from "../../../../styles/theme";
import PropTypes from 'prop-types'

class UserListItem extends React.PureComponent {
    constructor() {
        super();
    }

    render() {

        const user = this.props.peopleReducer.byId[this.props.userId];
        const sizeModifier = this.props.sizeModifier;

        return (
            <TouchableOpacity style={styles.container} onPress={() => handleViewProfile(user.uid)}>
                <Avatar rounded
                        width={35*sizeModifier}
                        height={35*sizeModifier}
                        source={{uri: user.profile === undefined ? '' : user.profile.source}}
                        onPress={() => handleViewProfile(user.uid)}
                        activeOpacity={0.7}/>
                <View style={styles.userInfo}>
                    <Text style={[styles.text, {fontSize: fontSize.regular * sizeModifier}]}>
                        {user.firstName + " " + user.lastName}
                    </Text>
                    <Text style={[styles.subText, {fontSize: fontSize.small * sizeModifier}]}>
                        {user.school}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

UserListItem.propTypes = {
    sizeModifier: PropTypes.float
};

UserListItem.defaultProps = {
    sizeModifier: 1.0
};

const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
    }
};

export default connect(mapStateToProps, null)(UserListItem);
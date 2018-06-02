import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import handleViewProfile from "../../utils/handleViewProfile";
import {fontSize} from "../../../../styles/theme";
import PropTypes from 'prop-types'
import {getProfileImage} from "../../../../network/firebase/user/actions";

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');

class UserListItem extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            source: null,
        }
    }

    componentDidMount() {
        this.fetchProfilePicture(this.props.userId);
    }

    fetchProfilePicture = (userId) => {
        this.props.getProfileImage(userId,
            (profile) => {
                console.log('i am here');
                this.setState({
                    source: profile.source
                });
            },
            (error) => {
                console.log(error);
            });
    };

    render() {

        const user = this.props.peopleReducer.byId[this.props.userId];

        if (!user) {
            return <View/>;
        }
        const sizeModifier = this.props.sizeModifier;
        const {source} = this.state;

        return (
            <TouchableOpacity style={styles.container} onPress={() => handleViewProfile(user.uid)}>
                <Avatar rounded
                        width={35*sizeModifier}
                        height={35*sizeModifier}
                        // source={{uri: user.profile === undefined ? defaultImage : user.profile.source}}
                        source={source === null ? defaultImage : {uri: source}}
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
    sizeModifier: PropTypes.number
};

UserListItem.defaultProps = {
    sizeModifier: 1.0
};

const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
    }
};

export default connect(mapStateToProps, {getProfileImage})(UserListItem);
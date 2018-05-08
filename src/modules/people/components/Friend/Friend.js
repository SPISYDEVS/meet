import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';

import styles from "./styles"

import {Text, View} from "react-native";
import handleViewProfile from "../../utils/handleViewProfile";

class Friend extends React.Component {
    constructor() {
        super();
    }

    render() {

        const {user} = this.props;

        return (
            <View style={styles.container}>

                <Avatar rounded
                        source={{uri: user.profile === undefined ? '' : user.profile.source}}
                        onPress={() => handleViewProfile(user.uid)}
                        activeOpacity={0.7}/>
                <View style={styles.userInfo}>
                    <Text>{user.firstName + " " + user.lastName}</Text>
                    <Text>{user.school}</Text>
                </View>

            </View>
        );
    }
}

export default connect(null, null)(Friend);
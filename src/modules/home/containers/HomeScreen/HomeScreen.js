import React from 'react';

import {connect} from 'react-redux';
import {SafeAreaView, Text, View} from "react-native";

import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import styles from "./styles";
import commonStyles from "../../../../styles/commonStyles";
import ExploreSearch from "../ExploreSearch/ExploreSearch";
import Feed from "../Feed/Feed";
import {Icon} from "react-native-elements";
import headerStyles from "../../../../styles/headerStyles";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMode: props.searchMode,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    };

    componentDidMount() {
        // this.props.signOut();
        this.props.persistCurrentUser(() => {
        }, () => {
        });
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={this.state.searchMode ? commonStyles.hidden : styles.container}>z
                    <Feed onSearchIconPress={() =>  this.setState({searchMode: true})}/>
                </View>
                <View style={!this.state.searchMode ? commonStyles.hidden : styles.container}>
                    <ExploreSearch onCancel={() => this.setState({searchMode: false})}/>
                </View>
            </SafeAreaView>
        );

    }
}

//allows the component to use actions as props
const actions = {
    persistCurrentUser,
    signOut
};

export default connect(null, actions)(HomeScreen);
import React from 'react';

import {connect} from 'react-redux';
import {SafeAreaView, Text, View} from "react-native";

import {persistCurrentUser, signOut} from '../../../../network/firebase/auth/actions';
import {fetchFeed, updateLocation} from '../../../../network/firebase/feed/actions';
import {fetchUsers} from "../../../../network/firebase/user/actions";
import styles from "./styles";
import commonStyles from "../../../../styles/commonStyles";
import ExploreSearch from "../ExploreSearch/ExploreSearch";
import Feed from "../Feed/Feed";
import {Icon} from "react-native-elements";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMode: false,
        }
    }

    componentDidMount(){
        this.props.persistCurrentUser(() => {
        }, () => {
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <SafeAreaView style={this.state.searchMode ? commonStyles.hidden : styles.container}>
                    <View style={styles.cappedContainer}>

                        <View style={[styles.padded, styles.rowContainer]}>
                            <Text style={styles.headerText}>Feed</Text>

                            <Icon name="search" size={35} color={"white"}
                                  onPress={() => this.setState({searchMode: true})}/>
                            {/*<Icon name="search" size={35} color={"white"} onPress={() => Actions.push('EventSearch')}/>*/}
                        </View>

                    </View>
                    <Feed/>
                </SafeAreaView>
                <SafeAreaView style={!this.state.searchMode ? commonStyles.hidden : styles.container}>
                    <ExploreSearch onCancel={() => this.setState({searchMode: false})}/>
                </SafeAreaView>
            </View>
        );

    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
    }
};

//allows the component to use actions as props
const actions = {
    persistCurrentUser
};

export default connect(mapStateToProps, actions)(HomeScreen);
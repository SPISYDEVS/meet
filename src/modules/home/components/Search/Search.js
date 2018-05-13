import React, {Component} from 'react';


import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {Icon, SearchBar} from 'react-native-elements'
import styles from "./styles"
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                showSearch: false,
                selectedValue: '',
            }
    }

    handleItemSelect = (value) => {
        this.setState({value: value});
    };

    render() {

        const {searchHint, callback} = this.props;

        const eventIds = this.props.eventReducer.allIds;
        const eventById = this.props.eventReducer.byId;

        const events = eventIds.map(id => {return {id: eventById[id]}});

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.cappedContainer}>

                    {!this.state.showSearch &&
                    <View style={[styles.padded, styles.rowContainer]}>
                        <Text style={styles.headerText}>Feed</Text>

                        <Icon name="search" size={35} color={"white"} onPress={() => Actions.push('EventSearch')}/>
                    </View>
                    }

                </View>

            </SafeAreaView>
        );
    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        feedReducer: state.feedReducer,
        user: state.authReducer.user
    }
};

//allows the component to use actions as props
const actions = {};

export default connect(mapStateToProps, actions)(Search);
import React, {Component} from 'react';


import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {SearchBar} from 'react-native-elements'
import styles from "./styles"
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";


class EventSearch extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                showEventSearch: false,
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

        const events = eventIds.map(id => {
            return {id: eventById[id]}
        });

        return (
            <SafeAreaView style={styles.container}>

                <View style={[styles.padded, styles.rowContainer]}>

                    <SearchBar
                        // onChangeText={(text) => {}}
                        placeholder={searchHint}
                        rounded
                        lightTheme
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchBar}
                        noIcon
                    />

                    <TouchableOpacity onPress={() => Actions.Feed()}>
                        <Text style={styles.headerText}>Cancel</Text>
                    </TouchableOpacity>

                </View>

                <View>



                </View>


            </SafeAreaView>
        );
    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        homeReducer: state.homeReducer,
        user: state.authReducer.user
    }
};

//allows the component to use actions as props
const actions = {};

export default connect(mapStateToProps, actions)(EventSearch);
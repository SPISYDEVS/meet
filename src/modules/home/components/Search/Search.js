import React, {Component} from 'react';


import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {Icon} from 'react-native-elements'
import styles from "./styles"
import {connect} from "react-redux";
import Selection from "../../../../components/Selection/Selection";


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

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.cappedContainer}>
                    {!this.state.showSearch &&
                    <View style={[styles.padded, styles.rowContainer]}>
                        <Text style={styles.headerText}>Feed</Text>

                        <Icon name="search" size={35} color={"#000"} onPress={() => this.setState({showSearch: true})}/>
                    </View>
                    }

                    {
                        this.state.showSearch &&

                        <View style={[styles.searchContainer, styles.rowContainer]}>

                            <Selection list={this.props.eventReducer.allIds}
                                       callback={(value) => this.handleItemSelect(value)}/>

                            {/*<SearchBar*/}
                            {/*// onChangeText={(text) => {}}*/}
                            {/*placeholder={searchHint}*/}
                            {/*rounded*/}
                            {/*lightTheme*/}
                            {/*inputStyle={styles.searchInput}*/}
                            {/*containerStyle={styles.searchBar}*/}
                            {/*noIcon*/}
                            {/*/>*/}

                            <TouchableOpacity onPress={() => this.setState({showSearch: false})}>
                                <Text style={styles.headerText}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    }

                    {/*<List>*/}
                    {/*{*/}
                    {/*this.state.results.slice(0, 10).map((item, i) => (*/}
                    {/*<ListItem*/}
                    {/*roundAvatar*/}
                    {/*key={i}*/}
                    {/*title={'Blank'}*/}
                    {/*leftIcon={{name: 'av-timer'}}*/}
                    {/*onPress={() => callback(item.value)}*/}
                    {/*{...item}*/}
                    {/*/>*/}
                    {/*))*/}
                    {/*}*/}
                    {/*</List>*/}
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

export default connect(mapStateToProps, actions)(Search);
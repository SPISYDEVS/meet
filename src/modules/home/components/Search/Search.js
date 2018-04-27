import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {Icon, List, ListItem, SearchBar} from 'react-native-elements'
import styles from "./styles"
import TrieSearch from 'trie-search';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                showSearch: false,
            }
    }

    resetSearch = () => {
        this.textInputRef.clear();
    };

    render() {

        const {searchHint, callback} = this.props;

        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.cappedContainer}>
                    {!this.state.showSearch &&
                    <View style={[styles.padded, styles.rowContainer]}>
                        <Text style={styles.headerText}>Feed</Text>

                        <Icon name="search" size={35} color={"#fff"} onPress={() => this.setState({showSearch: true})}/>
                    </View>
                    }

                    {
                        this.state.showSearch &&

                        <View style={[styles.searchContainer, styles.rowContainer]}>

                            <SearchBar
                                // onChangeText={(text) => {}}
                                placeholder={searchHint}
                                rounded
                                lightTheme
                                inputStyle={styles.searchInput}
                                containerStyle={styles.searchBar}
                            />

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

export default Search;
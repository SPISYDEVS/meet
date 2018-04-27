import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SafeAreaView, View} from 'react-native';

import {List, ListItem, SearchBar} from 'react-native-elements'
import styles from "./styles"
import TrieSearch from 'trie-search';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {searchHint, callback} = this.props;

        return (
            <SafeAreaView style={styles.container}>

                <SearchBar
                    onChangeText={(text) => this.search(text)}
                    onClearText={() => this.reset()}
                    placeholder={searchHint}
                    rounded
                    lightTheme
                    containerStyle={styles.searchBar}
                />

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

            </SafeAreaView>
        );
    }
}

export default Search;
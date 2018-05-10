import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ScrollView, View} from 'react-native';

import {List, ListItem, SearchBar} from 'react-native-elements'
import styles from "./styles"
import TrieSearch from 'trie-search';

class Selection extends Component {
    constructor(props) {
        super(props);

        const {objList, searchKey} = this.props;

        this.ts = new TrieSearch(searchKey);
        this.ts.addAll(objList);

        this.state = {
            results: objList
        };
    }

    reset = () => {
        const {objList} = this.props;
        this.setState({results: objList});
    };

    search = (term) => {
        if (!term || term.length === 0) {
            this.reset();
        } else {
            const results = this.ts.get(term);
            this.setState({results: results});
        }
    };

    render() {

        const {searchHint, callback} = this.props;

        return (
            <View style={styles.container}>

                <SearchBar
                    placeholder={searchHint}
                    rounded
                    lightTheme
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchBar}
                    onChangeText={(text) => this.search(text)}
                    onClearText={() => this.reset()}
                    noIcon
                />

                <View style={styles.listContainer}>
                    <List>
                        {
                            this.state.results.slice(0, 10).map((item, i) => (
                                <ListItem
                                    roundAvatar
                                    key={i}
                                    title={'Hello'}
                                    leftIcon={{name: 'av-timer'}}
                                    onPress={() => callback(item.value)}
                                    {...item}
                                />
                            ))
                        }
                    </List>
                </View>

            </View>
        );
    }
}

Selection.propTypes = {
    objList: PropTypes.array.isRequired,
    searchKey: PropTypes.string,
    searchHint: PropTypes.string,
    callback: PropTypes.func
};

Selection.defaultProps = {
    searchKey: 'title',
    callback: (item) => {
    }
};

export default Selection;
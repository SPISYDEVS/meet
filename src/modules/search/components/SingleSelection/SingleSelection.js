import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ScrollView, View} from 'react-native';

import {List, ListItem, SearchBar} from 'react-native-elements'
import styles from "./styles"
import TrieSearch from 'trie-search';

const UNDERLAY_COLOR = '#414141';

class SingleSelection extends Component {
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

        const {searchHint, searchFunc, callback} = this.props;

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
                    onBlur={() => searchFunc === undefined ? {} : searchFunc}
                />

                <ScrollView>
                    <List containerStyle={styles.listContainer}>
                        {
                            this.state.results.slice(0, 10).map((item, i) => (
                                <ListItem
                                    roundAvatar
                                    containerStyle={styles.listItemContainer}
                                    titleStyle={styles.listItemText}
                                    key={item.value}
                                    underlayColor={UNDERLAY_COLOR}
                                    hideChevron
                                    leftIcon={
                                        {
                                            name: this.props.iconName,
                                            type: this.props.iconType,
                                            color: 'white'
                                        }
                                    }
                                    onPress={() => callback(item.value)}
                                    {...item}
                                />
                            ))
                        }
                    </List>
                </ScrollView>

            </View>
        );
    }
}

SingleSelection.propTypes = {
    objList: PropTypes.array.isRequired,
    searchKey: PropTypes.string,
    searchHint: PropTypes.string,
    searchFunc: PropTypes.func,
    callback: PropTypes.func,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
};

SingleSelection.defaultProps = {
    searchKey: 'title',
    callback: (item) => {
    },
    iconName: '',
    iconType: '',
};

export default SingleSelection;
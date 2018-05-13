import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View, SafeAreaView, TouchableOpacity, FlatList, Text} from 'react-native';

import {List, ListItem, SearchBar, CheckBox, Icon} from 'react-native-elements'
import styles from "./styles"
import TrieSearch from 'trie-search';

const UNDERLAY_COLOR = '#414141';
const CHECKMARK_COLOR = '#CCC';

class MultiSelection extends Component {
    constructor(props) {
        super(props);

        const {objList, searchKey} = this.props;

        this.ts = new TrieSearch(searchKey);
        this.ts.addAll(objList);

        this.state = {
            results: objList,
            selectedItems: {}
        };
    }

    selectedItem = (item) => {
        const state = {...this.state};
        if (this.state.selectedItems[item.id] !== undefined) {
            delete state.selectedItems[item.id];
            // Turn off check mark
        }
        else {
            state.selectedItems[item.id] = item;
            // Turn on check mark
        }

        this.setState(state);
    };


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

        const {searchHint, searchFunc, callback, onSelectHandler} = this.props;

        return (
            <View style={styles.container}>

                <SearchBar
                    placeholder={searchHint}
                    rounded
                    lightTheme
                    inputStyle={styles.searchInput}
                    containerStyle={styles.searchBar}
                    onClearText={() => this.reset()}
                    onBlur={() => searchFunc === undefined ? {} : searchFunc}
                    noIcon
                />

                <View style={styles.listViewContainer}>
                    <List containerStyle={styles.listContainer}>
                        {
                            this.state.results.map((item, i) => (
                                <ListItem
                                    containerStyle={styles.listItemContainer}
                                    titleStyle={styles.listItemText}
                                    roundAvatar
                                    key={i}
                                    underlayColor={UNDERLAY_COLOR}
                                    onPress={() => {this.selectedItem(item)}}
                                    rightIcon={
                                        <Icon name={this.state.selectedItems[item.id] === undefined ?
                                            'checkbox-blank-circle-outline' : 'checkbox-marked-circle'}
                                              type='material-community'
                                              color={CHECKMARK_COLOR}
                                        />
                                    }
                                    {...item}
                                />
                            ))
                        }
                    </List>
                </View>

                <SafeAreaView
                    style={styles.bottomSafeArea}>
                    <View style={styles.bottomBar}>
                        <View style={styles.profileScrollView}>
                            <FlatList/>
                        </View>

                        <TouchableOpacity
                            style={styles.addButton} onPress={() => onSelectHandler(this.state.selectedItems)}>
                            <Text style={styles.addButtonText}>Add</Text>>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

            </View>
        );
    }
}

MultiSelection.propTypes = {
    objList: PropTypes.array.isRequired,
    searchKey: PropTypes.string,
    searchHint: PropTypes.string,
    searchFunc: PropTypes.func,
    callback: PropTypes.func
};

MultiSelection.defaultProps = {
    searchKey: 'title',
    callback: (item) => {
    }
};

export default MultiSelection;
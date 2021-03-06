import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ScrollView, View, SafeAreaView, TouchableOpacity, FlatList, Text} from 'react-native';

import {List, ListItem, SearchBar, CheckBox, Icon} from 'react-native-elements'
import styles from "./styles"
import TrieSearch from 'trie-search';

const UNDERLAY_COLOR = '#414141';
const CHECKMARK_COLOR = '#CCC';

class MultiSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            selectedItems: {}
        };
    }

    componentDidMount() {
        const {objList, searchKey} = this.props;

        this.ts = new TrieSearch(searchKey);
        this.ts.addAll(objList);
        this.setState({
            results: objList,
            selectedItems: {}
        });
        console.log(objList);
    }

    componentWillReceiveProps(nextProps) {
        const {objList, searchKey} = nextProps;

        this.ts = new TrieSearch(searchKey);
        this.ts.addAll(objList);
        this.setState({
            results: objList,
            selectedItems: {}
        });
    }

    selectedItem = (item) => {
        const state = {...this.state};
        if (this.state.selectedItems[item.id] !== undefined) {
            delete state.selectedItems[item.id];
        }
        else {
            state.selectedItems[item.id] = item;
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

    renderAvatar = (invitee, i) => {
        return (
            <ListItem
                roundAvatar
                key={i}
                containerStyle={styles.avatarListItem}
                hideChevron={true}
                avatar={invitee.item.avatar}
            />
        );
    };

    render() {

        const {searchHint, searchFunc, callback, onSelectHandler} = this.props;

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>

                    <SearchBar
                        placeholder={searchHint}
                        rounded
                        lightTheme
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchBar}
                        onChangeText={(text) => this.search(text)}
                        onClearText={() => this.reset()}
                        onBlur={(event) => searchFunc === undefined ? {} : searchFunc}
                    />

                    <View style={styles.listViewContainer}>
                        <ScrollView>
                            <List containerStyle={styles.listContainer}>
                                {
                                    this.state.results.map((item) => (
                                        <ListItem
                                            containerStyle={styles.listItemContainer}
                                            titleStyle={styles.listItemText}
                                            roundAvatar
                                            key={item.id}
                                            underlayColor={UNDERLAY_COLOR}
                                            onPress={() => {
                                                this.selectedItem(item)
                                            }}
                                            rightIcon={
                                                <Icon
                                                    name={this.state.selectedItems[item.id] === undefined ?
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
                        </ScrollView>
                    </View>


                </View>
                {
                    Object.values(this.state.selectedItems).length !== 0 &&
                    <View style={styles.bottomBar}>
                        <View style={styles.profileScrollView}>
                            <FlatList
                                data={Object.values(this.state.selectedItems)}
                                horizontal
                                keyExtractor={invitee => invitee.id}
                                renderItem={(invitee, i) => this.renderAvatar(invitee, i)}
                            />
                        </View>

                        <View style={styles.addButton}>
                            <TouchableOpacity
                                onPress={() => onSelectHandler(this.state.selectedItems)}>
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </SafeAreaView>
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
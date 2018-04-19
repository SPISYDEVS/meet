import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';

import {List, ListItem, SearchBar} from 'react-native-elements'
import {isEmpty} from '../../utils/validate'
import styles from "./styles"
import TrieSearch from 'trie-search';

class Selection extends Component {
    constructor(props) {
        super(props);

        const {list} = this.props;

        this.ts = new TrieSearch('title');
        this.ts.addAll(list);

        this.state = {
            results: list
        };
    }

    reset = () => {
        const {list} = this.props;
        this.setState({results: list});
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
                    onChangeText={(text) => this.search(text)}
                    onClearText={() => this.reset()}
                    placeholder={searchHint}/>

                <List>
                    {
                        this.state.results.slice(0, 10).map((item, i) => (
                            <ListItem
                                roundAvatar
                                key={i}
                                title={'Blank'}
                                leftIcon={{name: 'av-timer'}}
                                onPress={() => callback(item.value)}
                                {...item}
                            />
                        ))
                    }
                </List>

            </View>
        );
    }
}

Selection.propTypes = {
    list: PropTypes.array.isRequired,
    searchHint: PropTypes.string,
    callback: PropTypes.func
};

Selection.defaultProps = {
    callback: () => {
    }
};

export default Selection;
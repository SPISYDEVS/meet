import React from 'react';
import PropTypes from 'prop-types'

import {Text, View, TouchableOpacity} from 'react-native';

import styles from "./styles"

class TabButtons extends React.Component {
    constructor(props) {
        super(props);

        const {buttons} = this.props;
        this.state = this.createState(buttons);

        //bind functions
        this.onSelect = this.onSelect.bind(this);
    }

    createState(buttons) {
        //create the state
        const state = {};

        buttons.forEach((button) => {
            let {title, callback, selected} = button;
            state[title] = {title: title, selected: selected, callback: callback};
        });

        return state;
    }

    onSelect(key){
        let {callback} = this.state[key];

        // const state = {};
        //
        // const stateKeys = Object.keys(this.state);
        //
        // stateKeys.forEach((button) => (state[button] = {...this.state[button], selected: key === button}));
        //
        // this.setState(state);

        callback(key);
    }

    render() {
        const {buttons} = this.props;

        return (
            <View style={styles.container}>
                {
                    buttons.map((button, idx) => {
                        let {title, selected} = button;
                        return (
                            <TouchableOpacity key={title} style={selected ? styles.selectedButton : styles.button} onPress={() => this.onSelect(title)}>
                                <Text style={selected ? styles.selectedText : styles.text}>{title}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }
}

TabButtons.propTypes = {
    buttons: PropTypes.array.isRequired,
};

export default TabButtons;
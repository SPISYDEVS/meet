import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List, ListItem} from 'react-native-elements'
import {ListView, ListViewDataSource} from 'react-native';

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer
    }
};

import {isEmpty} from '../../../auth/utils/validate'
import styles from "./styles"

class Events extends Component {

    render() {
        const events = Object.values(this.props.eventReducer.byId);
        console.log(events);
        return (
            <List>
                {
                    events.map((item, i) => (
                        <ListItem
                            roundAvatar
                            key={i}
                            title={item.title}
                            subtitle={item.description}
                            subtitleNumberOfLines={4}
                            leftIcon={{name: 'av-timer'}}
                        />
                    ))
                }
            </List>
        );
    }
}

export default connect(mapStateToProps, {})(Events);

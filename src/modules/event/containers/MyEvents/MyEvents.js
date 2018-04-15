import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List, ListItem} from 'react-native-elements'
import {ListView} from 'react-native';

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer
    }
};

import {isEmpty} from '../../../auth/utils/validate'
import styles from "./styles"

class MyEvents extends Component {

    render() {
        const events = this.props.eventReducer.myIds.map((id) => this.props.eventReducer.byId[id]);
        return (
            <List>
                {
                    events.map((item, i) => (
                        <ListItem
                            roundAvatar
                            key={i}
                            title={item.title}
                            subtitle={item.description}
                            subtitleNumberOfLines={3}
                            leftIcon={{name: 'av-timer'}}
                        />
                    ))
                }
            </List>
        );
    }
}

export default connect(mapStateToProps, {})(MyEvents);

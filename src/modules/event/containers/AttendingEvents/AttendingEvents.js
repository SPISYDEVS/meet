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

class AttendingEvents extends Component {

    render() {
        const events = Object.values(this.props.eventReducer.byId);
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

export default connect(mapStateToProps, {})(AttendingEvents);

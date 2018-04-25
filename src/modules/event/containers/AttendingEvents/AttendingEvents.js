import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List, ListItem} from 'react-native-elements'
import {ListView, ScrollView} from 'react-native';

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer
    }
};

import {isEmpty} from '../../../auth/utils/validate'
import styles from "./styles"
import Event from "../../components/Event/Event";

class AttendingEvents extends Component {

    render() {
        // const events = Object.values(this.props.eventReducer.byId);
        const events = [{}, {}, {}];
        return (
            <ScrollView style={styles.container}>
                {
                    events.map((item) => (
                        <Event
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, {})(AttendingEvents);

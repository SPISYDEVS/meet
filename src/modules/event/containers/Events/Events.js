import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ListView, View} from 'react-native';
import AttendingEvents from '../AttendingEvents'
import MyEvents from '../MyEvents'

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer
    }
};

import TabButtons from "../../components/TabButtons";


class Events extends Component {
    constructor() {
        super();

        const buttons = [
            {
                title: 'Managing',
                callback: this.setToManaging.bind(this),
                initialTab: true,
            },
            {
                title: 'Attending',
                callback: this.setToAttending.bind(this),
                initialTab: false
            }
        ];

        this.state = {
            buttons: buttons,
            managingTab: true,
            attendingTab: false
        };

        this.setToManaging = this.setToManaging.bind(this);
        this.setToAttending = this.setToAttending.bind(this);
    }

    setToManaging() {
        this.setState({managingTab: true, attendingTab: false});
    }

    setToAttending() {
        this.setState({managingTab: false, attendingTab: true});
    }

    render() {

        const events = Object.values(this.props.eventReducer.byId);

        return (
            <View>
                <TabButtons buttons={this.state.buttons}/>
                {this.state.managingTab && <MyEvents/>}
                {this.state.attendingTab && <AttendingEvents/>}
            </View>
        );
    }
}

export default connect(mapStateToProps, {})(Events);

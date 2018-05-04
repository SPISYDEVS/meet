import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';
import AttendingEvents from '../AttendingEvents'
import MyEvents from '../MyEvents'


import TabButtons from "../../components/TabButtons";
import styles from "./styles";


class Events extends Component {
    constructor() {
        super();

        const buttons = [
            {
                title: 'Managing',
                callback: this.setToTab.bind(this),
                selected: true,
            },
            {
                title: 'Attending',
                callback: this.setToTab.bind(this),
                selected: false
            }
        ];

        this.state = {
            buttons: buttons,
        };

        this.setToTab = this.setToTab.bind(this);
    }
    //
    // componentDidMount() {
    //
    //     const myEvents = this.props.user.events;
    //
    //     //handle lazily loading user data from firebase if the users aren't loaded into the client yet
    //     const plannedAttendees = this.props.plannedAttendees;
    //     let usersToFetch = [];
    //
    //     plannedAttendees.forEach(id => {
    //         if(!(id in this.props.peopleReducer.byId)){
    //             usersToFetch.push(id);
    //         }
    //     });
    //
    //     if(usersToFetch.length > 0) {
    //         this.props.fetchUsers(usersToFetch, () => {
    //         }, () => {
    //         });
    //     }
    //
    // }

    setToTab(tabKey) {
        const state = {...this.state};
        state.buttons = [];

        this.state.buttons.forEach((button) => {
            state.buttons.push({
                title: button.title,
                callback: this.setToTab.bind(this),
                selected: button.title === tabKey
            })
        });
        this.setState(state);
    }

    render() {

        const events = Object.values(this.props.eventReducer.byId);

        return (
            <View style={styles.container}>
                <TabButtons buttons={this.state.buttons}/>
                <View style={styles.content}>
                    {this.state.buttons[0].selected && <MyEvents/>}
                    {this.state.buttons[1].selected && <AttendingEvents/>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        eventReducer: state.eventReducer
    }
};

export default connect(mapStateToProps, {})(Events);

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
        eventReducer: state.eventReducer
    }
};

export default connect(mapStateToProps, {})(Events);

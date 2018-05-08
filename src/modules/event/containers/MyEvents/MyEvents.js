import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';

import TabButtons from "../../../common/components/TabButtons";
import styles from "./styles";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import EventListView from "../../components/EventListView/EventListView";


class MyEvents extends Component {
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
    //
    // componentDidMount(){
    //     let {eventsAsHost, eventsAsAttendee} = this.props.currentUser;
    //
    //     eventsAsHost = eventsAsHost === undefined ? {} : eventsAsHost;
    //     eventsAsAttendee = eventsAsAttendee === undefined ? {} : eventsAsAttendee;
    //
    //     eventsAsHost = Object.keys(eventsAsHost);
    //     eventsAsAttendee = Object.keys(eventsAsAttendee);
    //
    //     const eventIds = eventsAsHost.concat(eventsAsAttendee.filter(id => !eventsAsHost.includes(id)));
    //     console.log("WEEHEEHEEE");
    //     console.log(eventIds);
    //     this.fetchEvents(eventIds);
    // }
    //
    // fetchEvents = (eventIds) => {
    //
    //     //handle lazily loading event data from firebase if the events aren't loaded into the client yet
    //     let eventsToFetch = [];
    //
    //     eventIds.forEach(id => {
    //         if(!(id in this.props.eventReducer.byId)){
    //             eventsToFetch.push(id);
    //         }
    //     });
    //
    //     if(eventsToFetch.length > 0) {
    //
    //         console.log("WOOHOOOO");
    //         console.log(eventsToFetch);
    //
    //         this.props.fetchEvents(eventsToFetch, () => {
    //         }, () => {
    //         });
    //     }
    //
    // };

    render() {

        // const events = Object.values(this.props.eventReducer.byId);
        let {eventsAsHost, eventsAsAttendee} = this.props.currentUser;

        eventsAsHost = eventsAsHost === undefined ? {} : eventsAsHost;
        eventsAsAttendee = eventsAsAttendee === undefined ? {} : eventsAsAttendee;

        eventsAsHost = Object.keys(eventsAsHost);
        eventsAsAttendee = Object.keys(eventsAsAttendee);

        return (
            <View style={styles.container}>
                <TabButtons buttons={this.state.buttons}/>
                <View style={styles.content}>
                    {this.state.buttons[0].selected && <EventListView eventIds={eventsAsHost}/>}
                    {this.state.buttons[1].selected && <EventListView eventIds={eventsAsAttendee}/>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        currentUser: state.authReducer.user
    }
};

const actions = {
    fetchEvents,
};

export default connect(mapStateToProps, actions)(MyEvents);

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';

import {Actions} from 'react-native-router-flux'
import TabButtons from "../../../common/components/TabButtons";
import styles from "./styles";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import EventListView from "../../components/EventListView/EventListView";
import headerStyles from "../../../../styles/headerStyles";
import {color} from "../../../../styles/theme";
import {Icon} from "react-native-elements";

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
            // dataLoaded: false
        };

        this.setToTab = this.setToTab.bind(this);
    }

    //check if we need to fetch any external data from firebase
    // componentDidMount() {
    //     let {eventsAsHost, eventsAsAttendee} = this.props.currentUser;
    //
    //     eventsAsHost = Object.keys(eventsAsHost);
    //     eventsAsAttendee = Object.keys(eventsAsAttendee);
    //     const eventIds = eventsAsHost.concat(eventsAsAttendee.filter(id => !eventsAsHost.includes(id)));
    //
    //     this.fetchEvents(eventIds);
    // }
    //
    // fetchEvents = (eventIds) => {
    //     const eventsToFetch = [];
    //
    //     eventIds.forEach(eventId => {
    //         if (!(eventId in this.props.eventReducer.byId)) {
    //             eventsToFetch.push(eventId);
    //         }
    //     });
    //
    //     //handle lazily loading event data from firebase if the events aren't loaded into the client yet
    //     if (eventIds.length > 0) {
    //         this.props.fetchEvents(eventIds, () => {
    //             this.setState({dataLoaded: true});
    //         }, () => {
    //         });
    //     } else {
    //         this.setState({dataLoaded: true});
    //     }
    // };

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

        // if (!this.state.dataLoaded) {
        //     return <View style={styles.container}>
        //         <ActivityIndicator animating color='white' size="large"/>
        //     </View>
        // }

        // const events = Object.values(this.props.eventReducer.byId);
        let {eventsAsHost, eventsAsAttendee} = this.props.currentUser;

        eventsAsHost = eventsAsHost === undefined ? {} : eventsAsHost;
        eventsAsAttendee = eventsAsAttendee === undefined ? {} : eventsAsAttendee;

        eventsAsHost = Object.keys(eventsAsHost);
        eventsAsAttendee = Object.keys(eventsAsAttendee);

        const hasNoEventsAsHost = eventsAsHost.length === 0 && this.state.buttons[0].selected;
        const hasNoEventsAsAttendee = eventsAsAttendee.length === 0 && this.state.buttons[1].selected;

        return (
            <SafeAreaView style={styles.container}>
                <View style={[headerStyles.padded, headerStyles.rowContainer]}>
                    <Text style={headerStyles.headerText}>My Events</Text>

                    <Icon type='ionicon' name="md-add"
                          color={color.text}
                          size={35} onPress={() => Actions.push('EventForm')}/>
                </View>

                <View style={styles.content}>

                    <TabButtons buttons={this.state.buttons}/>


                    {hasNoEventsAsHost &&
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>There's no events, you stupid loser</Text>
                    </View>
                    }

                    {hasNoEventsAsAttendee &&
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>There's no events, you stupid loser</Text>
                    </View>
                    }
                    <View style={this.state.buttons[0].selected ? styles.active : styles.hidden}>


                        <EventListView eventIds={eventsAsHost}/>


                    </View>


                    <View style={this.state.buttons[1].selected ? styles.active : styles.hidden}>

                        <EventListView eventIds={eventsAsAttendee}/>


                    </View>
                </View>
            </SafeAreaView>
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

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";
import haversine from "haversine";
import moment from "moment";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import {fetchUsers} from "../../../../network/firebase/user/actions";

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        eventReducer: state.eventReducer,
        peopleReducer: state.peopleReducer,
        homeReducer: state.homeReducer,
    }
};

class EventListView extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                lastEventId: null,
                dataLoaded: false,
            }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const lastEventId = nextProps.eventIds[nextProps.eventIds.length - 1];

        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if (lastEventId !== prevState.lastEventId) {
            return {
                lastEventId: lastEventId,
                dataLoaded: false,
            };
        }

        // No state update necessary
        return null;

    }

    componentDidMount() {
        const eventIds = this.props.eventIds;
        this.fetchEvents(eventIds);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.dataLoaded) {
            const eventIds = this.props.eventIds;
            this.fetchEvents(eventIds);
        }
    }

    fetchEvents = (eventIds) => {

        //handle lazily loading event data from firebase if the events aren't loaded into the client yet
        let eventsToFetch = [];

        eventIds.forEach(id => {
            if (!(id in this.props.eventReducer.byId)) {
                eventsToFetch.push(id);
            }
        });

        if(eventsToFetch.length > 0) {
            this.props.fetchEvents(eventsToFetch, () => {
            }, () => {
                this.setState({dataLoaded: true});
            });
        } else {
            this.setState({dataLoaded: true});
        }

    };

    render() {

        if (!this.state.dataLoaded) {
            return <View/>
        }

        const userLocation = this.props.homeReducer.location;

        const eventIds = this.props.eventIds;
        const events = this.props.eventReducer.byId;
        const users = this.props.peopleReducer.byId;

        return (
            <ScrollView style={styles.container}>
                {
                    eventIds.map((id) => {

                        //pull the values with the keys 'title', 'description', etc... from the corresponding event
                        const {title, description, date, hostId, location, address} = events[id];
                        const {firstName, lastName, profile} = users[hostId];

                        //gets the distance between the user and the location of an event, truncates to 1 decimal place
                        const distance = haversine(location, userLocation, {unit: 'mile'}).toFixed(1);

                        // const formattedDate = moment(date).calendar();

                        return (

                            <Event
                                key={id}
                                title={title}
                                description={description}
                                date={date}
                                distance={distance}
                                address={address}
                                hostName={firstName + " " + lastName}
                                hostPic={profile ? profile.source : ''}
                                hostId={hostId}
                                eventId={id}
                            />

                        )
                    })
                }
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, {fetchEvents, fetchUsers})(EventListView);

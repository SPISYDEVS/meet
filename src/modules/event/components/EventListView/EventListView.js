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
    constructor(){
        super();
    }
    componentWillMount() {
    }

    fetchEvents = () => {

        const eventIds = this.props.eventIds;

        //handle lazily loading event data from firebase if the events aren't loaded into the client yet
        let eventsToFetch = [];

        eventIds.forEach(id => {
            if (!(id in this.props.eventReducer.byId)) {
                eventsToFetch.push(id);
            }
        });

        if (eventsToFetch.length > 0) {
            this.props.fetchEvents(eventIds, () => {this.setState({dataLoaded: true})}, () => {});
        } else {
            this.setState({dataLoaded: true});
        }

    };

    fetchRequired = () => {

        const eventIds = this.props.eventIds;

        let eventsToFetch = [];

        eventIds.forEach(id => {
            if (!(id in this.props.eventReducer.byId)) {
                eventsToFetch.push(id);
            }
        });

        return (eventsToFetch.length > 0);

    };

    render() {

        if(this.fetchRequired()) {
            this.fetchEvents();
            return <View/>
        }

        const userLocation = this.props.homeReducer.location;

        const eventIds = this.props.eventIds;
        const events = this.props.eventReducer.byId;
        const users = this.props.peopleReducer.byId;

        return (
            <ScrollView style={styles.container}>
                {
                    eventIds.map((id, i) => {

                        //pull the values with the keys 'title', 'description', etc... from the corresponding event
                        const {title, description, date, hostId, location, address} = events[id];

                        let firstName = '';
                        let lastName = '';
                        let profile = '';

                        if(hostId in users){
                            firstName = users[hostId].firstName;
                            lastName = users[hostId].lastName;
                            profile = users[hostId].profile;
                        }

                        //gets the distance between the user and the location of an event, truncates to 1 decimal place
                        const distance = haversine(location, userLocation, {unit: 'mile'}).toFixed(1);

                        const formattedDate = moment(date).calendar();

                        return (

                            <Event
                                key={id}
                                title={title}
                                description={description}
                                date={formattedDate}
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

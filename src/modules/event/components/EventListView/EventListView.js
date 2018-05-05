import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";
import haversine from "haversine";
import moment from "moment";

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        eventReducer: state.eventReducer,
        homeReducer: state.homeReducer,
    }
};

class EventListView extends Component {

    render() {

        const userLocation = this.props.homeReducer.location;

        const eventIds = this.props.eventIds;
        const events = this.props.eventReducer.byId;

        return (
            <ScrollView style={styles.container}>
                {
                    eventIds.map((id, i) => {

                        //pull the values with the keys 'title', 'description', etc... from the corresponding event
                        const {title, description, date, hostName, hostId, location, address} = events[id];

                        //gets the distance between the user and the location of an event, truncates to 1 decimal place
                        const distance = haversine(location, userLocation, {unit: 'mile'}).toFixed(1);

                        const formattedDate = moment(date).calendar();

                        return <Event
                            key={id}
                            title={title}
                            description={description}
                            date={formattedDate}
                            distance={distance}
                            address={address}
                            hostName={hostName}
                            hostId={hostId}
                            eventId={id}
                        />
                    })
                }
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, null)(EventListView);

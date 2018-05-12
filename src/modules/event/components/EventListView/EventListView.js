import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";

class EventListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const eventIds = this.props.eventIds;

        return (
            <ScrollView style={styles.container}>
                {
                    eventIds.map((id) => {
                        return (
                            <Event key={id} eventId={id}/>
                        )
                    })
                }
            </ScrollView>
        );
    }
}

export default EventListView;

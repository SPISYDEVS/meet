import React from 'react';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements'

import styles from "./styles"

import {Text, View} from "react-native";

class EventListItem extends React.PureComponent {
    constructor() {
        super();
    }

    render() {

        const event = this.props.eventReducer.byId[this.props.eventId];

        return (
            <View style={styles.container}>


                <Icon name='map-marker-outline' type='material-community' size={40}/>

                <View style={styles.eventInfo}>

                    <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.address} numberOfLines={1}>{event.address}</Text>

                </View>

            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
    }
};

export default connect(mapStateToProps, null)(EventListItem);
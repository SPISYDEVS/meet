import React from 'react';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

import styles from "./styles"

import {Text, TouchableOpacity, View} from "react-native";
import {color} from "../../../../styles/theme";

class EventListItem extends React.PureComponent {
    constructor() {
        super();
    }

    handlePress = () => {
        Actions.push('EventDetails', {eventId: this.props.eventId});
    };

    render() {

        const event = this.props.eventReducer.byId[this.props.eventId];

        if (!event) {
            return <View/>
        }

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.handlePress()}>

                <Icon name='map-marker-outline' type='material-community' color={color.white} size={40}/>

                <View style={styles.eventInfo}>

                    <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.address} numberOfLines={1}>{event.address}</Text>

                </View>

            </TouchableOpacity>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
    }
};

export default connect(mapStateToProps, null)(EventListItem);
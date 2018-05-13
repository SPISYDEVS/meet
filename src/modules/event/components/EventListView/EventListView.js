import React, {Component} from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";

class EventListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    renderItem = (obj) => {
        const eventId = obj.item;
        return <Event key={eventId} eventId={eventId}/>;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating color='white' size="large" />
            </View>
        );
    };


    render() {

        const eventIds = this.props.eventIds;

        return (
            <FlatList
                style={styles.container}
                data={eventIds}
                renderItem={(item) => this.renderItem(item)}
                ListFooterComponent={this.renderFooter}
                initialNumToRender={5}
            />
        );
    }
}

export default EventListView;

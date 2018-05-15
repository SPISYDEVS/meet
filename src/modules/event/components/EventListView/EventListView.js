import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";

class EventListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
        }
    }

    renderItem = (obj) => {
        const eventId = obj.item;
        return <Event eventId={eventId}/>;
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
                keyExtractor={(id) => id}
                ListFooterComponent={this.renderFooter}
                initialNumToRender={5}
                refreshing={this.state.refreshing}
                onRefresh={() => this.props.onRefresh()}
            />
        );
    }
}

EventListView.propTypes = {
    onRefresh: PropTypes.func
};

EventListView.defaultProps = {
    onRefresh: () => {}
};

export default EventListView;

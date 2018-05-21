import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, FlatList, ScrollView, View, Text, Animated} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";
import {HEADER_HEIGHT} from "../../../../config/constants";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        );
    };


    render() {

        const eventIds = this.props.eventIds;

        return (
            <AnimatedFlatList
                style={styles.container}
                data={eventIds}
                renderItem={(item) => this.renderItem(item)}
                keyExtractor={(id) => id}
                ListFooterComponent={this.renderFooter}
                initialNumToRender={5}
                refreshing={this.state.refreshing}
                onRefresh={() => this.props.onRefresh()}
                scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
                onScroll={this.props.animated ? Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.props.scrollY}}}],
                    {useNativeDriver: true} // <-- Add this
                ) : () => {
                }}
                contentContainerStyle={this.props.animated ? {
                    marginTop: HEADER_HEIGHT,
                    paddingBottom: HEADER_HEIGHT
                } : {}}
            />
        );
    }
}

EventListView.propTypes = {
    onRefresh: PropTypes.func,
    animated: PropTypes.bool
};

EventListView.defaultProps = {
    onRefresh: () => {
    },
    scrollY: 0,
    animated: false
};

export default EventListView;

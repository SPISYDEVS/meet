import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {ActivityIndicator, Animated, Platform, SafeAreaView, Text, View} from "react-native";
import EventCardListView from "../../../event/components/EventCardListView/EventCardListView";
import {Icon} from "react-native-elements";
import commonStyles from "../../../../styles/commonStyles";
import headerStyles from "../../../../styles/headerStyles";
import styles from "./styles";
import {HEADER_HEIGHT} from "../../../../config/constants";
import {fetchTagEvents} from '../../../../network/firebase/tag/actions';
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import {debounce} from "lodash";


class TagDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            eventIds: []
        };

        this.debouncedFetchTagEvents = debounce(this.fetchTagEvents, 3000);

    }


    componentDidMount() {
        this.fetchTagEvents();
    };


    fetchTagEvents = () => {
        console.log(this.props.title);
        this.props.fetchTagEvents(this.props.title,
            (data) => {
            console.log(data);
                this.setState({
                    eventIds: Object.keys(data.events),
                    dataLoaded: true
                });
            },
            (error) => {
                console.log(error);
            });
    };


    render() {
        const {eventIds} = this.state;

        const events = this.props.eventReducer.byId;
        eventIds.sort(function(a,b) {
            return events[a].startDate - events[b].startDate;
        });

        if (!this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }


        return (
            <SafeAreaView style={styles.container}>
                <BackHeader simpleBackChevron/>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        #{this.props.title}
                    </Text>
                </View>
                <EventCardListView eventIds={eventIds} onRefresh={this.debouncedFetchTagEvents}/>

            </SafeAreaView>
        );
    }
}


TagDetails.propTypes = {
    title: PropTypes.string.isRequired
};


const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        feedReducer: state.feedReducer,
        peopleReducer: state.peopleReducer,
        user: state.authReducer.user
    }
};


const actions = {
    fetchTagEvents
};


export default connect(mapStateToProps, actions)(TagDetails);
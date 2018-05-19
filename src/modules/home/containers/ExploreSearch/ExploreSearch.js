import React, {Component} from 'react';


import {FlatList, Keyboard, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import {SearchBar} from 'react-native-elements'
import styles from "./styles"
import {connect} from "react-redux";
import {searchEvents, searchUsers} from "../../../../network/firebase/user/actions";
import UserListItem from "../../../people/components/UserListItem/UserListItem";
import PropTypes from "prop-types";
import {IndicatorViewPager, PagerTabIndicator} from "rn-viewpager";
import EventListItem from "../../../event/components/EventListItem/EventListItem";


class ExploreSearch extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                selectedValue: '',
                searchValue: '',
                userResult: null,
                eventResult: null
            }
    }

    handleItemSelect = (value) => {
        this.setState({value: value});
    };

    handleSearch = () => {
        this.props.searchUsers(this.state.searchValue, (users) => {
            let userResult = Object.keys(users);
            if (userResult.length === 0) {
                userResult = null;
            }
            this.setState({userResult: userResult});
        });

        this.props.searchEvents(this.state.searchValue, (events) => {
            let eventResult = Object.keys(events);
            if (eventResult.length === 0) {
                eventResult = null;
            }
            this.setState({eventResult: eventResult});
        });

    };

    renderUser = (item) => {
        const userId = item.item;
        return <UserListItem userId={userId}/>
    };

    renderEvent = (item) => {
        const eventId = item.item;
        return <EventListItem eventId={eventId}/>
    };

    _renderTabIndicator = () => {
        let tabs = [{
            text: 'Events',
            // iconSource: require('../imgs/ic_tab_home_normal.png'),
            // selectedIconSource: require('../imgs/ic_tab_home_click.png')
        }, {
            text: 'People',
            // iconSource: require('../imgs/ic_tab_task_normal.png'),
            // selectedIconSource: require('../imgs/ic_tab_task_click.png')
        }, {
            text: 'Tags',
            // iconSource: require('../imgs/ic_tab_my_normal.png'),
            // selectedIconSource: require('../imgs/ic_tab_my_click.png')
        }];
        return <PagerTabIndicator tabs={tabs}/>;
    };

    onCancel = () => {
        Keyboard.dismiss();
        this.props.onCancel();
    };

    render() {

        const {searchHint, callback} = this.props;

        const eventIds = this.props.eventReducer.allIds;
        const eventById = this.props.eventReducer.byId;

        const events = eventIds.map(id => {
            return {id: eventById[id]}
        });

        return (
            <SafeAreaView style={styles.container}>

                <View style={[styles.padded, styles.rowContainer]}>

                    <SearchBar
                        onChangeText={(text) => this.setState({searchValue: text})}
                        placeholder={searchHint}
                        rounded
                        lightTheme
                        inputStyle={styles.searchInput}
                        containerStyle={styles.searchBar}
                        onSubmitEditing={(event) => this.handleSearch()}
                        // onEndEditing={() => {this.props.searchUsers}
                        noIcon
                    />

                    <TouchableOpacity onPress={() => this.onCancel()}>
                        <Text style={styles.headerText}>Cancel</Text>
                    </TouchableOpacity>

                </View>

                <IndicatorViewPager
                    style={styles.viewPager}
                    indicator={this._renderTabIndicator()}
                >
                    <View>

                        <FlatList
                            data={this.state.eventResult}
                            renderItem={(item) => this.renderEvent(item)}
                            keyExtractor={(eventId) => eventId}
                            // refreshing={this.state.refreshing}
                            // onRefresh={() => this.props.onRefresh()}
                        />

                    </View>

                    <View>

                        <FlatList
                            data={this.state.userResult}
                            renderItem={(item) => this.renderUser(item)}
                            keyExtractor={(userId) => userId}
                            // refreshing={this.state.refreshing}
                            // onRefresh={() => this.props.onRefresh()}
                        />

                    </View>

                    <View>

                        <FlatList
                            data={this.state.userResult}
                            renderItem={(item) => this.renderUser(item)}
                            keyExtractor={(userId) => userId}
                            // refreshing={this.state.refreshing}
                            // onRefresh={() => this.props.onRefresh()}
                        />

                    </View>
                </IndicatorViewPager>


            </SafeAreaView>
        );
    }
}


ExploreSearch.propTypes = {
    onCancel: PropTypes.func
};

ExploreSearch.defaultProps = {
    onCancel: () => {
    }
};

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        feedReducer: state.feedReducer,
        user: state.authReducer.user
    }
};

// allows the component to use actions as props
const actions = {
    searchUsers,
    searchEvents
};

export default connect(mapStateToProps, actions)(ExploreSearch);
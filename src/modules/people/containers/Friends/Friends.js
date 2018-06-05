import React from 'react';
import {connect} from 'react-redux';

import styles from "./styles"

import {ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View} from "react-native";

import UserListItem from "../../components/UserListItem/UserListItem";

import {fetchUsers} from "../../../../network/firebase/user/actions";
import commonStyles from "../../../../styles/commonStyles";


class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false,
            refresh: false
        }
    }

    componentDidMount() {
        this.fetchFriends();
    }

    fetchFriends() {
        this.setState({
            refresh: true
        });

        if (this.props.user.friends === undefined) {
            this.setState({
                dataLoaded: true,
                refresh: false
            });
            return;
        }

        const friends = Object.keys(this.props.user.friends);

        let usersToFetch = [];

        friends.forEach(id => {
            if (!(id in this.props.peopleReducer.byId)) {
                usersToFetch.push(id);
            }
        });

        if (usersToFetch.length > 0) {
            this.props.fetchUsers(usersToFetch, () => {
                this.setState({
                    dataLoaded: true,
                    refresh: false
                });
            }, (error) => {
                console.log(error);
            });
        } else {
            this.setState({
                dataLoaded: true,
                refresh:false
            });
        }
    };

    onRefresh = () => {
        this.fetchFriends();
    };

    renderItem = (item) => {
        const userId = item.item;
        return <UserListItem userId={userId} sizeModifier={1.2}/>
    };

    render() {

        if (!this.state.dataLoaded) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        // const friends = [0, 1, 2];
        let friends = this.props.user.friends === undefined ? null : Object.keys(this.props.user.friends);

        if (friends !== null) {
            friends = friends.filter(id => this.props.user.friends[id]);
        }

        return (
            <ScrollView
                style={{flex: 1}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refresh}
                        onRefresh={this.onRefresh}
                    />
                }>
                {
                    friends === null &&
                    <View style={commonStyles.emptyContainer}>
                        <Text style={commonStyles.emptyText}>
                            Go make some friends!
                        </Text>
                    </View>
                }
                {
                    friends !== null &&
                    <FlatList
                        style={styles.container}
                        data={friends}
                        renderItem={(item) => this.renderItem(item)}
                        keyExtractor={(userId) => userId}
                        initialNumToRender={5}
                        // refreshing={this.state.refreshing}
                        // onRefresh={() => this.props.onRefresh()}
                    />
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
        user: state.authReducer.user
    }
};

export default connect(mapStateToProps, {fetchUsers})(Friends);
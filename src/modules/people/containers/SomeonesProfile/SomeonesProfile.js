import React from 'react';
import {Avatar} from 'react-native-elements'
import {connect} from 'react-redux';
import styles from "./styles"
import {ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {AVATAR_SIZE} from "../../../profile/constants";

import {
    fetchUsers,
    getProfileImage,
    revokeFriendship,
    sendFriendRequest
} from "../../../../network/firebase/user/actions";
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import RoundedButton from "../../../common/components/RoundedButton/RoundedButton";
import {sendPushNotification} from "../../../../network/firebase/pushnotifications/actions";
import {fetchEvents} from "../../../../network/firebase/event/actions";
import EventListView from "../../../event/components/EventCardListView/EventCardListView";
import commonStyles from "../../../../styles/commonStyles";
import headerStyles from "../../../../styles/headerStyles";
import {debounce} from "lodash";

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');

class SomeonesProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            mVisible: false,
            userFetched: false,
            source: null,
            attendingEvents: [],
            attendingEventsFetched: false,
            friendshipStatus: null,
            receivingFriendRequest: false,
        };

        this.debounceHandleFriends = debounce(this.handleFriends, 300)

    }

    componentDidMount() {

        //fetch user
        //establish the friendship status between the two users
        //load the user's events if they are friends (events are only visible to friends)
        this.initializeFriendData();
        this.fetchProfilePicture();

    }

    initializeFriendData = () => {

        const user = this.props.people.byId[this.props.userId];

        //lazily load the person's profile
        if (user === undefined) {

            this.props.fetchUser(this.props.userId,
                () => {
                    this.setState({
                        userFetched: true
                    });
                    this.setFriendshipStatus();
                }
                , (err) => console.log(err));

        } else {
            this.setState({
                userFetched: true
            });
            this.setFriendshipStatus();
        }
     };

    setFriendshipStatus = () => {

        const currentUser = this.props.currentUser;
        let friendshipStatus = null;
        let receivingFriendRequest = false;

        //checks to see if the user is already a friend or has been requested to be a friend already
        //true means they're friends
        //false means current user has requested friendship
        //null means they're literally strangers
        if (currentUser.friends !== undefined && this.props.userId in currentUser.friends) {
            friendshipStatus = true;
        }
        else if (currentUser.friendRequestsTo !== undefined && this.props.userId in currentUser.friendRequestsTo) {
            friendshipStatus = false;
        }
        //user has received a friend request from that person
        else if (currentUser.friendRequestsFrom !== undefined && this.props.userId in currentUser.friendRequestsFrom) {
            receivingFriendRequest = true;
        }

        this.setState({
            friendshipStatus: friendshipStatus,
            receivingFriendRequest: receivingFriendRequest,
        });

        if(!this.state.attendingEventsFetched) {
            this.fetchFriendsAttendingEvents(friendshipStatus);
        }

    };

    fetchFriendsAttendingEvents = (friendshipStatus) => {

        if (friendshipStatus) {

            let attending = this.props.people.byId[this.props.userId].eventsAsAttendee;

            if (attending) {
                attending = Object.keys(attending);

                this.props.fetchEvents(attending, () => {
                    this.setState({
                        attendingEvents: attending,
                        attendingEventsFetched: true
                    });
                }, (err) => console.log(err));

            } else {
                this.setState({
                    attendingEventsFetched: true
                });
            }

        } else {
            this.setState({
                attendingEventsFetched: true
            });
        }
    };

    fetchProfilePicture = () => {
        this.props.getProfileImage(this.props.userId,
            (profile) => {
                this.setState({
                    source: profile.source
                });
            },
            (error) => {
                console.log(error);
            });
    };

    revokeFriendship = () => {
        this.props.revokeFriendship(this.props.userId, () => {
            this.setState({
                mVisible: false,
                friendshipStatus: null
            });
        });
    };

    handleFriends = (fStatus) => {

        //if friends
        if (fStatus) {

            this.setState({mVisible: true});

        } else {

            this.props.sendFriendRequest(this.props.userId, () => {

                const currentUser = this.props.currentUser;
                const name = currentUser.firstName + " " + currentUser.lastName;
                this.setState({
                    friendshipStatus: false
                });

                this.props.sendPushNotification([this.props.userId],
                    "Friend Request!",
                    name + " wants to be friends",
                    () => {
                    },
                    (err) => console.log(err)
                );

            }, (err) => console.log(err));

        }

    };

    render() {

        let {friendshipStatus, receivingFriendRequest, source} = this.state;
        const user = this.props.people.byId[this.props.userId];

        if (!this.state.userFetched || !user) {
            return <View style={commonStyles.loadingContainer}>
                <ActivityIndicator animating color='white' size="large"/>
            </View>
        }

        return (
            <SafeAreaView style={{flex: 1}}>

                <BackHeader simpleBackChevron/>

                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoContent}>
                            <Avatar
                                height={AVATAR_SIZE}
                                width={AVATAR_SIZE}
                                rounded
                                source={source === null ? defaultImage : {uri: source}}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.username}>{user.firstName + " " + user.lastName}</Text>
                                <Text style={styles.school}>{user.school}</Text>
                            </View>
                        </View>
                    </View>


                    {!this.state.attendingEventsFetched ?
                        <View style={commonStyles.loadingContainer}>
                            <ActivityIndicator animating color='white' size="large"/>
                        </View> :

                        !this.state.friendshipStatus ?

                            <View style={commonStyles.emptyContainer}>
                                <Text style={commonStyles.emptyText}> You must be {user.firstName}'s friend to see his
                                    events </Text>
                            </View>

                            :

                            <View style={styles.eventsContainer}>
                                <Text style={headerStyles.headerText}> {user.firstName}'s Events</Text>
                                <EventListView eventIds={this.state.attendingEvents}/>
                            </View>
                    }

                    {
                        receivingFriendRequest &&
                        <RoundedButton
                            title={user.firstName + " sent you a friend request!"}
                            disabled
                            onPress={() => {
                            }}/>
                    }

                    {
                        !receivingFriendRequest &&
                        <RoundedButton
                            title={friendshipStatus === null ? 'SEND FRIEND REQUEST' : friendshipStatus ? 'FRIENDS!' : 'FRIEND REQUEST SENT'}
                            disabled={friendshipStatus === false}
                            onPress={() => this.debounceHandleFriends(friendshipStatus)}/>
                    }

                    <Modal style={styles.modal} isVisible={this.state.mVisible}
                           onBackdropPress={() => this.setState({mVisible: false})}>
                        <View style={styles.modalContent}>
                            <View style={styles.main}>
                                <Text style={styles.text}>Are you sure you want to
                                    unfriend {user.firstName + " " + user.lastName}?</Text>
                            </View>
                            <View style={styles.modalBottom}>
                                <TouchableOpacity onPress={() => this.revokeFriendship()}>
                                    <Text style={styles.text}>Unfriend</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({mVisible: false})}>
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.authReducer.user,
        people: state.peopleReducer
    }
};

const actions = {
    fetchUser,
    fetchEvents,
    sendFriendRequest,
    revokeFriendship,
    sendPushNotification,
    getProfileImage
};

SomeonesProfile.propTypes = {
    userId: PropTypes.string.isRequired,
};


export default connect(mapStateToProps, actions)(SomeonesProfile);

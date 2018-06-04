import React from 'react';

import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View,
    Keyboard
} from 'react-native';

import styles, {commentStyles} from "./styles";
import commonStyles from '../../../../styles/commonStyles';
import {connect} from "react-redux";

import {fetchUsers, getProfileImages} from '../../../../network/firebase/user/actions';
import {commentOnEvent, fetchEventComments} from '../../../../network/firebase/event/actions';
import {LinearGradient} from 'expo';
import BackHeader from "../../../common/components/BackHeader/BackHeader";
import {color} from "../../../../styles/theme";
import handleViewProfile from "../../../people/utils/handleViewProfile";
import {Avatar} from "react-native-elements";
import moment from "moment";

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');


class EventComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            offset: 0,
            upScroll: true,
            commenting: false,
            comment: '',
            profiles: {}
        };
    }

    componentDidMount() {

        const eventId = this.props.eventId;

        //fetch the comments associated with the event
        this.props.fetchEventComments(eventId, () => {

            //after the comments are fetched, fetch the user profiles associated with the comments
            const event = this.props.eventReducer.byId[eventId];
            const comments = event.comments;

            //handle lazily loading user data from firebase if the users aren't loaded into the client yet
            let usersToFetch = [];
            let usersToFetchProfiles = [];

            comments.forEach(comment => {
                if (!(comment.userId in this.props.peopleReducer.byId)) {
                    usersToFetch.push(id);
                }
                usersToFetchProfiles.push(comment.userId);
            });

            this.fetchProfileImages(usersToFetchProfiles);

            if (usersToFetch.length > 0) {

                this.props.fetchUsers(usersToFetch, () => {
                    this.setState({dataLoaded: true});
                }, (err) => console.log(err));

            } else {
                this.setState({dataLoaded: true});
            }

        }, (err) => console.log(err));

    };

    fetchProfileImages = (userIds) => {
        console.log(userIds);
        this.props.getProfileImages(userIds,
            (profiles) => {
            console.log(profiles);
                this.setState({
                    profiles: profiles
                });
            },
            (error) => {
                console.log(error);
            });
    };

    renderComment = (comment) => {

        const user = this.props.peopleReducer.byId[comment.userId];
        const commentValue = comment.comment;
        const timeAgo = moment.utc(comment.timestamp).local().fromNow();
        const {profiles} = this.state;

        let hasProfile = profiles[comment.userId] !== null && profiles[comment.userId] !== undefined;

        return (
            <TouchableOpacity style={commentStyles.container} onPress={() => handleViewProfile(user.uid)}>
                <Avatar rounded
                        source={hasProfile ? {uri: profiles[comment.userId].source} : defaultImage}
                        onPress={() => handleViewProfile(user.uid)}
                        activeOpacity={0.7}/>
                <View style={commentStyles.comment}>
                    <View style={commentStyles.content}>
                        <Text style={commentStyles.text}>{user.firstName + " " + user.lastName}
                            <Text style={commentStyles.subText}>  {commentValue}</Text>
                        </Text>
                    </View>
                    <View style={commentStyles.details}>
                        <Text style={commentStyles.text}>{timeAgo}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const upScroll = currentOffset < this.state.offset;
        this.setState({offset: currentOffset, upScroll: upScroll});
    };

    commentOnEvent = () => {
        this.props.commentOnEvent(this.props.eventId, this.state.comment,
            () => {},
            (err) => console.log(err));

        this.setState({comment: ''});
    };

    render() {

        const backgroundGradient = this.props.backgroundGradient;

        if (!this.state.dataLoaded) {
            return <LinearGradient colors={backgroundGradient}
                                   style={[{flex: 1}, commonStyles.loadingContainer]}
                                   start={[.5, .15]}>
                <ActivityIndicator animating color='white' size="large"/>
            </LinearGradient>
        }

        console.log('rerendered');
        const comments = this.props.eventReducer.byId[this.props.eventId]['comments'];

        if (comments === undefined || comments.length === 0) {
            return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <LinearGradient colors={backgroundGradient}
                                style={{flex: 1}}
                                start={[.5, .15]}>

                    <SafeAreaView style={{flex: 1}}>
                        <BackHeader simpleBackChevron/>

                        <View style={styles.container}>
                            <View style={commonStyles.loadingContainer}>
                                <Text style={styles.emptyCommentsText}> No comments! </Text>
                            </View>
                        </View>
                    </SafeAreaView>
                    <KeyboardAvoidingView
                        behavior="padding"
                    >
                        <View style={styles.commentInputContainer}>
                            <View style={styles.commentInput}>
                                <TextInput placeholder="Add a comment..."
                                           placeholderTextColor={color.black}
                                           style={styles.commentInputText}
                                           onFocus={() => this.setState({commenting: true})}
                                           onBlur={() => this.setState({commenting: false})}
                                           onChangeText={(value) => this.setState({comment: value})}
                                           value={this.state.comment}
                                           multiline/>
                                {
                                    this.state.comment.length > 0 &&
                                    <TouchableOpacity style={styles.postButton}
                                                      onPress={() => this.commentOnEvent()}>
                                        <Text style={styles.postButtonText}>Post!</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </TouchableWithoutFeedback>
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <LinearGradient colors={backgroundGradient}
                                style={{flex: 1}}
                                start={[.5, .15]}>
                    <SafeAreaView style={{flex: 1}}>

                        <BackHeader simpleBackChevron/>

                        <View style={styles.container}>
                            <FlatList
                                data={comments}
                                extraData={this.state}
                                renderItem={(comment) => this.renderComment(comment.item)}
                                keyExtractor={comment => (comment.userId + comment.timestamp)}
                            />
                        </View>

                    </SafeAreaView>

                    <KeyboardAvoidingView
                        behavior="padding"
                    >
                        <View style={styles.commentInputContainer}>
                            <View style={styles.commentInput}>
                                <TextInput placeholder="Add a comment..."
                                           placeholderTextColor={color.black}
                                           style={styles.commentInputText}
                                           onFocus={() => this.setState({commenting: true})}
                                           onBlur={() => this.setState({commenting: false})}
                                           onChangeText={(value) => this.setState({comment: value})}
                                           value={this.state.comment}
                                           multiline/>
                                {
                                    this.state.comment.length > 0 &&
                                    <TouchableOpacity style={styles.postButton}
                                                      onPress={() => this.commentOnEvent()}>
                                        <Text style={styles.postButtonText}>Post!</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </TouchableWithoutFeedback>

        );

    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        eventReducer: state.eventReducer,
        currentUser: state.authReducer.user,
        peopleReducer: state.peopleReducer,
    }
};

const actions = {
    fetchUsers,
    commentOnEvent,
    fetchEventComments,
    getProfileImages
};

export default connect(mapStateToProps, actions)(EventComments);

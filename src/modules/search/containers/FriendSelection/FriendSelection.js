import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MultiSelection from "../../components/MultiSelection/MultiSelection";
import {fetchUsers, getProfileImages} from "../../../../network/firebase/user/actions";
import {connect} from "react-redux";

const defaultImage = require('../../../../assets/images/default_profile_picture.jpg');


class FriendSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profiles: {},
            friends: []
        };
    }

    componentDidMount() {

        //fetch necessary users that we don't have objects to
        if (this.props.user.friends === undefined) {
            return;
        }

        let friends = Object.keys(this.props.user.friends);

        let usersToFetch = [];

        friends.forEach(id => {
            if (!(id in this.props.peopleReducer.byId)) {
                usersToFetch.push(id);
            }
        });

        if (usersToFetch.length > 0) {
            this.props.fetchUsers(usersToFetch, () => {
            }, () => {
            });
        }

        console.log(this.props.notIncluded);

        friends = friends.filter(id => !this.props.notIncluded.includes(id));

        console.log(friends);
        this.setState({
            friends: friends
        });

        this.fetchProfileImages(friends);
    }


    fetchProfileImages = (userIds) => {
        this.props.getProfileImages(userIds,
            (profiles) => {
                // console.log(profiles);
                this.setState({
                    profiles: profiles
                });
            },
            (error) => {
                console.log(error);
            });
    };


    render() {
        let {profiles, friends} = this.state;

        //pass in a list of friend objects
        friends = friends.map(id => {
            if (id in this.props.peopleReducer.byId) {

                const friend = this.props.peopleReducer.byId[id];

                let avatar = profiles[id] === undefined || profiles[id] === null ? defaultImage : {uri: profiles[id].source};

                return {
                    id: friend.uid,
                    title: friend.firstName + " " + friend.lastName,
                    avatar: avatar
                }

            }
            return {}
        });


        return (
            <MultiSelection {...this.props} objList={friends}/>
        );

    }
}

FriendSelection.propTypes = {
    searchKey: PropTypes.string,
    searchHint: PropTypes.string,
    callback: PropTypes.func,
    notIncluded: PropTypes.array,
    // onSelectHandler: PropTypes.func.required,
};

FriendSelection.defaultProps = {
    searchKey: 'title',
    callback: (item) => {
    }
};


const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
        user: state.authReducer.user
    }
};

export default connect(mapStateToProps, {fetchUsers, getProfileImages})(FriendSelection);
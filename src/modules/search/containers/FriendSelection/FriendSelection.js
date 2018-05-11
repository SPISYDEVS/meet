import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingleSelection from "../../components/SingleSelection/SingleSelection";
import {fetchUsers} from "../../../../network/firebase/user/actions";
import {connect} from "react-redux";

class FriendSelection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        if (this.props.user.friends === undefined) {
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
            }, () => {
            });
        }

    }



    render() {

        let friends = this.props.user.friends === undefined ? [] : Object.keys(this.props.user.friends);

        friends = friends.map(id => {
            if (id in this.props.peopleReducer.byId) {

                const friend = this.props.peopleReducer.byId[id];

                let avatar = friend.profile ? {uri: friend.profile.source} : {uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"};
                return {
                    title: friend.firstName + " " + friend.lastName,
                    avatar: avatar
                }

            }
            return {}
        });

        return (
            <SingleSelection {...this.props} objList={friends}/>
        );

    }
}

FriendSelection.propTypes = {
    searchKey: PropTypes.string,
    searchHint: PropTypes.string,
    callback: PropTypes.func,
    onSelectHandler: PropTypes.func.required,
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

export default connect(mapStateToProps, {fetchUsers})(FriendSelection);
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingleSelection from "../../../common/components/SingleSelection/SingleSelection";
import {fetchUsers} from "../../../../network/firebase/user/actions";

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
                return this.props.peopleReducer.byId[id];
            
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
    callback: PropTypes.func
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
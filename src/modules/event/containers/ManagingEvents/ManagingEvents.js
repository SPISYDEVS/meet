import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import styles from "./styles";
import Event from "../../components/Event/Event";


import {rsvpEvent} from "../../../../network/firebase/Event/actions";

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        eventReducer: state.eventReducer
    }
};

class ManagingEvents extends Component {

    render() {
        // const events = this.props.eventReducer.myIds.map((id) => this.props.eventReducer.byId[id]);


        const events = [{},{},{},{}];
        return (
            <ScrollView style={styles.container}>
                {
                    events.map((item, i) => (
                        <Event
                            key={i}
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
                {
                    events.map((item, i) => (
                        <Event
                            key={i}
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
                {
                    events.map((item, i) => (
                        <Event
                            key={i}
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, {rsvpEvent})(ManagingEvents);

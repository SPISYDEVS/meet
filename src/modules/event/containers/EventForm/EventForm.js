import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {isEmpty} from '../../utils/validate'
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import moment from "moment";
import DatePicker from "../../../common/components/DatePicker/DatePicker";
import {createState, extractData, hasErrors} from "../../../common/utils/formUtils";
import TextInput from "../../../common/components/TextInput/TextInput";
import Button from "react-native-elements/src/buttons/Button";
import formStyles from "../../../../styles/formStyles";
import Modal from "react-native-modal";
import PlacePicker from "../../components/PlacePicker/PlacePicker";
import {DATE_FORMAT, GOOGLE_MAPS_PLACE_API_KEY} from "../../../../config/constants";
import {momentFromDate} from "../../../common/utils/dateUtils";

import {createEvent} from "../../../../network/firebase/event/actions";
import {reverseGeocode} from "../../../../network/googleapi/GoogleMapsAPI";
import {Icon} from "react-native-elements";
import FriendSelection from "../../../search/containers/FriendSelection/FriendSelection";


class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.form = {
            fields: {
                title: {
                    options: {
                        placeholder: "Title",
                        type: "text",
                        multiline: false,
                    },
                    validator: (title) => !isEmpty(title),
                    errorMessage: 'Title is required'
                },
                description: {
                    options: {
                        placeholder: "Description",
                        multiline: true,
                    },
                    type: "text",
                },
                date: {
                    options: {
                        format: DATE_FORMAT,
                        minuteInterval: 1,
                        mode: 'datetime',
                    },
                    value: moment().format(DATE_FORMAT),
                    type: 'date',
                },
                location: {
                    options: {
                        placeholder: "Location",
                        type: "location",
                        minLength: 2,
                        fetchDetails: true,
                        // nearbyPlacesAPI: 'GoogleReverseGeocoding',
                        debounce: 200,
                        query: {
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: GOOGLE_MAPS_PLACE_API_KEY,
                            language: 'en', // language of the results
                        },
                        currentLocation: true, // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel: "Current location",
                    },
                    value: this.props.location,
                    validator: (location) => !isEmpty(location),
                    errorMessage: "Location is required",
                    other: {
                        address: '',
                        modalVisible: false
                    }
                },
                invitations: {
                    options: {},
                    other: {
                        objList: [],
                        modalVisible: false
                    },
                    value: [],
                }
            }
        };

        this.state = createState(this.form.fields);

        //bind functions
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit = () => {

        const data = extractData(this.state);

        if (hasErrors(data['error'])) {
            const newState = {...this.state};
            newState['error'] = data['error'];
            this.setState(newState);
        } else {

            //transform data to pass into firebase
            data['data']['date'] = momentFromDate(data['data']['date']).valueOf();
            data['data']['address'] = this.state['location']['other']['address'];
            data['data']['invitations'] = data['data']['invitations'].map(invitee => invitee.id);

            this.props.createEvent(data['data'], this.props.currentUser, this.onSuccess, this.onError);
        }

    };

    onSuccess() {
        Actions.FeedScreen();
    };

    onError(error) {
        let errObj = this.state.error;
        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    openLocationModal = () => {
        const state = {...this.state};
        state['location']['other']['modalVisible'] = true;
        this.setState(state);
    };

    closeLocationModal = () => {
        const state = {...this.state};
        state['location']['other']['modalVisible'] = false;
        this.setState(state);
    };

    openInvitationsModal = () => {
        const state = {...this.state};
        state['invitations']['other']['modalVisible'] = true;
        this.setState(state);
    };

    closeInvitationsModal = () => {
        const state = {...this.state};
        state['invitations']['other']['modalVisible'] = false;
        this.setState(state);
    };

    onLocationChange = (data) => {

        const state = {...this.state};

        state['location']['value'] = data;

        //make a get request (we want to reverse geolookup an address given a latlng)
        //we then update the state with the returned value
        reverseGeocode(data.latitude, data.longitude, (address) => {
            state['location']['other']['address'] = address;
            this.setState(state);
        }, (error) => {
            throw error;
        });

    };

    onChange = (key, data) => {
        const state = {...this.state};
        state[key]['value'] = data;
        this.setState(state);
    };

    renderLocation = (location) => {
        if (location.length > 0) {
            return <Text style={styles.locationPre}> {location} </Text>
        }
        else {
            return <Text style={styles.locationPost}> Choose a location </Text>
        }
    };

    //callback function used when you select a friend to invite
    inviteFriend = (friends) => {

        const state = {...this.state};

        //close modal and update state
        state['invitations']['value'] = Object.values(friends);
        state['invitations']['other']['modalVisible'] = false;
        this.setState(state);

    };

    render() {

        const form = this.form;
        const [title, description, date, location, invitations] = Object.keys(this.form.fields);
        const address = this.state[location]['other']['address'];
        const invited = this.state['invitations']['value'];
        const friendsToNotInclude = invited.map(invitee => invitee.id);

        return (
            <View style={styles.container}>

                {/*input for the form title*/}
                <TextInput
                    style={styles.title}
                    {...form.fields[title]['options']}
                    onChangeText={(text) => this.onChange(title, text)}
                    value={this.state[title]['value']}
                    error={this.state['error'][title]}
                />

                {/* Below is the input for the location field, which opens a modal when clicked*/}
                <View style={[formStyles.containerView]}>
                    <TouchableOpacity style={styles.locationContainer} onPress={() => this.openLocationModal()}>
                        {this.renderLocation(address)}
                    </TouchableOpacity>
                </View>

                {/*location input modal*/}
                <Modal isVisible={this.state[location]['other']['modalVisible']} style={styles.modal}>
                    <PlacePicker location={this.state[location]['value']}
                                 onLocationChange={this.onLocationChange}
                                 options={this.form.options}/>
                    <Button
                        raised
                        title='Complete'
                        borderRadius={4}
                        containerViewStyle={formStyles.containerView}
                        buttonStyle={formStyles.button}
                        textStyle={formStyles.buttonText}
                        onPress={() => this.closeLocationModal()}
                    />
                </Modal>

                {/*input for the date*/}
                <DatePicker
                    {...form.fields[date]}
                    value={this.state[date]['value']}
                    onDateChange={(newDate) => this.onChange(date, newDate)}
                />

                {/*input for the description of the event*/}
                <TextInput
                    {...form.fields[description]['options']}
                    onChangeText={(text) => this.onChange(description, text)}
                    value={this.state[description]['value']}
                    error={this.state['error'][description]}
                />

                {/* Below is the input for the invitations, which opens a modal when clicked*/}
                <View style={[formStyles.containerView]}>
                    <TouchableOpacity style={styles.invitationsContainer} onPress={() => this.openInvitationsModal()}>
                        <Icon type='feather' name='plus'/>
                        <Text>Invite People</Text>
                    </TouchableOpacity>
                </View>

                {/*modal for inviting ppl*/}
                <Modal isVisible={this.state[invitations]['other']['modalVisible']} style={styles.modal}>
                    <TouchableOpacity onPress={() => this.closeInvitationsModal()}>
                        <Icon type='feather' name='x'/>
                    </TouchableOpacity>
                    <FriendSelection onSelectHandler={this.inviteFriend} notIncluded={friendsToNotInclude}/>
                </Modal>

                {/* ScrollView of friends */}
                <ScrollView>
                    {this.state['invitations']['value'].map(invitee =>
                        <Text>
                            {invitee.title}
                        </Text>
                    )}
                </ScrollView>

                {/*submit button to create the event*/}
                <Button
                    raised
                    title='Complete'
                    borderRadius={4}
                    containerViewStyle={formStyles.containerView}
                    buttonStyle={formStyles.button}
                    textStyle={formStyles.buttonText}
                    onPress={() => this.onSubmit()}
                />
            </View>
        );
    }
}

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        currentUser: state.authReducer.user,
        location: state.feedReducer.location
    }
};

export default connect(mapStateToProps, {createEvent})(EventForm);

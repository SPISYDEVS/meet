import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {isEmpty} from '../../utils/validate'
import {
    ActivityIndicator, Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {FormValidationMessage, Icon, List, ListItem} from "react-native-elements";
import styles, {dateStyles} from "./styles";
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

import {createEvent, editEvent} from "../../../../network/firebase/event/actions";
import {reverseGeocode} from "../../../../network/googleapi/GoogleMapsAPI";
import FriendSelection from "../../../search/containers/FriendSelection/FriendSelection";
import {color, fontSize} from "../../../../styles/theme";
import PropTypes from 'prop-types';
import commonStyles from "../../../../styles/commonStyles";
import {LinearGradient} from "expo";
import {fetchBackgroundGradient} from "../../utils/index";
import BackHeader from "../../../common/components/BackHeader/BackHeader";


const UNDERLAY_COLOR = '#414141';
const CHECKMARK_COLOR = '#CCC';


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
                        inputStyle: {
                            fontSize: fontSize.xlarge + 2
                        }
                    },
                    value: this.props.title,
                    validator: (title) => !isEmpty(title),
                    errorMessage: 'Title is required',
                },
                description: {
                    options: {
                        placeholder: "Description",
                        multiline: true,
                    },
                    value: this.props.description,
                    type: "text",
                },
                startDate: {
                    options: {
                        format: DATE_FORMAT,
                        minuteInterval: 1,
                        mode: 'datetime',
                        placeholder: 'Starting Time',
                        customStyles: dateStyles,
                    },
                    value: this.props.startDate,

                    // value: moment().format(DATE_FORMAT),
                    validator: (time) => time !== '',
                    errorMessage: 'Pick a starting time',
                    type: 'date',
                },
                endDate: {
                    options: {
                        format: DATE_FORMAT,
                        minuteInterval: 1,
                        mode: 'datetime',
                        placeholder: 'Ending Time',
                        customStyles: dateStyles,
                    },
                    value: this.props.endDate,

                    // value: moment().format(DATE_FORMAT),
                    validator: (time) => time !== '',
                    errorMessage: 'Pick an end time',
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
                    value: this.props.location ? this.props.location : '',
                    validator: (location) => location !== '',
                    errorMessage: "Location is required",
                    other: {
                        address: this.props.address,
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
            data['data']['startDate'] = momentFromDate(data['data']['startDate']).utc().valueOf();
            data['data']['endDate'] = momentFromDate(data['data']['endDate']).utc().valueOf();
            data['data']['address'] = this.state['location']['other']['address'];
            data['data']['invitations'] = data['data']['invitations'].map(invitee => invitee.id);

            //check if we're editing an existing event, or making a new one
            if (this.props.editMode) {
                this.props.editEvent(data['data'], this.props.currentUser, this.props.eventId, this.onSuccess, this.onError);
            } else {
                this.props.createEvent(data['data'], this.props.currentUser, this.onSuccess, this.onError);
            }
        }

    };

    onSuccess() {
        Actions.pop();
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

        const location = data.location;
        const address = data.address;

        state['location']['value'] = location;
        state['location']['other']['address'] = address;

        this.setState(state);

    };

    onStartDateChange = (newDate) => {
        const state = {...this.state};

        const startDate = moment(newDate, DATE_FORMAT).valueOf();
        const endDate = moment(state['endDate']['value'], DATE_FORMAT).valueOf();

        if (startDate >= endDate) {
            state['error']['startDate'] = 'Starting time must be before the ending time';
        } else {
            state['startDate']['value'] = newDate;
            state['error']['startDate'] = '';
        }

        this.setState(state);
    };

    onEndDateChange = (newDate) => {
        const state = {...this.state};

        const startDate = moment(state['startDate']['value'], DATE_FORMAT).valueOf();
        const endDate = moment(newDate, DATE_FORMAT).valueOf();

        if (startDate >= endDate) {
            state['error']['endDate'] = 'Ending time must be after the starting time';
        } else {
            state['endDate']['value'] = newDate;
            state['error']['endDate'] = '';
        }
        this.setState(state);
    };

    onChange = (key, data) => {
        const state = {...this.state};
        state[key]['value'] = data;
        this.setState(state);
    };

    renderLocation = (location) => {
        if (location.length > 0) {
            return <Text style={styles.locationPost}>{location}</Text>
        }
        else {
            return <Text style={styles.locationPre}>Choose a location</Text>
        }
    };

    //callback function used when you select a friend to invite
    inviteFriend = (friends) => {

        const state = {...this.state};

        //close modal and update state
        state['invitations']['value'] = state['invitations']['value'].concat(Object.values(friends));
        state['invitations']['other']['modalVisible'] = false;
        this.setState(state);

    };


    removeInvitee = (invitee) => {
        const state = {...this.state};
        let invitees = state.invitations.value;
        invitees = invitees.filter(user => user.id !== invitee.id);
        state.invitations.value = invitees;
        this.setState(state);
    };


    render() {

        const form = this.form;
        const [title, description, startDate, endDate, location, invitations] = Object.keys(this.form.fields);
        const address = this.state[location]['other']['address'];
        const invited = this.state[invitations]['value'];
        const friendsToNotInclude = invited.map(invitee => invitee.id).concat(this.props.invitees);

        let backgroundGradient = [color.background];

        if (this.state[startDate]['value']) {
            backgroundGradient = fetchBackgroundGradient(moment(this.state[startDate]['value'], DATE_FORMAT).valueOf());
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <LinearGradient colors={backgroundGradient}
                                style={{flex: 1}}
                                start={[.5, .15]}>

                    <SafeAreaView style={styles.container}>

                        <BackHeader simpleBackChevron/>

                        <ScrollView>

                            <View style={styles.content}>

                                <View style={styles.textInputContainer}>
                                    {/*input for the form title*/}
                                    <TextInput
                                        {...form.fields[title]['options']}
                                        onChangeText={(text) => this.onChange(title, text)}
                                        value={this.state[title]['value']}
                                        error={this.state['error'][title]}
                                    />

                                </View>

                                <View style={styles.inputContainer}>
                                    {/*input for the date*/}
                                    <DatePicker
                                        {...form.fields[startDate]}
                                        value={this.state[startDate]['value']}
                                        error={this.state['error'][startDate]}
                                        onDateChange={(newDate) => this.onStartDateChange(newDate)}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    {/*input for the date*/}
                                    <DatePicker
                                        {...form.fields[endDate]}
                                        value={this.state[endDate]['value']}
                                        error={this.state['error'][endDate]}
                                        onDateChange={(newDate) => this.onEndDateChange(newDate)}
                                    />

                                </View>

                                <View style={styles.locationContainer}>
                                    {/* Below is the input for the location field, which opens a modal when clicked*/}
                                    <TouchableOpacity onPress={() => this.openLocationModal()}>
                                        {this.renderLocation(address)}
                                    </TouchableOpacity>
                                    {
                                        (!isEmpty(this.state['error'][location])) &&
                                        <FormValidationMessage labelStyle={formStyles.errorText}>
                                            {this.state['error'][location]}
                                        </FormValidationMessage>
                                    }
                                </View>

                                {/*location input modal*/}
                                <Modal isVisible={this.state[location]['other']['modalVisible']} style={styles.modal}>
                                    <PlacePicker
                                        location={this.state[location]['value'] !== '' ? this.state[location]['value'] : this.props.userLocation}
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

                                <View style={styles.textInputContainer}>

                                    {/*input for the description of the event*/}
                                    <TextInput
                                        {...form.fields[description]['options']}
                                        onChangeText={(text) => this.onChange(description, text)}
                                        value={this.state[description]['value']}
                                        error={this.state['error'][description]}
                                    />
                                </View>

                                {/* Below is the input for the invitations, which opens a modal when clicked*/}
                                <View>
                                    <TouchableOpacity style={styles.invitationsContainer}
                                                      onPress={() => this.openInvitationsModal()}>
                                        <Icon type='feather' name='plus' color={color.text}/>
                                        <Text style={styles.text}>Invite People</Text>
                                    </TouchableOpacity>
                                </View>

                                {/*modal for inviting ppl*/}
                                <Modal isVisible={this.state[invitations]['other']['modalVisible']}
                                       style={styles.modal}>
                                    <SafeAreaView style={styles.modalContent}>
                                        <View style={styles.modalHeader}>
                                            <TouchableOpacity onPress={() => this.closeInvitationsModal()}>
                                                <Icon type='feather' name='x' color={color.text}/>
                                            </TouchableOpacity>
                                        </View>
                                        <FriendSelection onSelectHandler={this.inviteFriend}
                                                         notIncluded={friendsToNotInclude}/>
                                    </SafeAreaView>
                                </Modal>

                                {/* ListView of friends */}
                                <List>
                                    {
                                        this.state.invitations.value.map((invitee, i) => (
                                            <ListItem
                                                containerStyle={styles.listItemContainer}
                                                titleStyle={styles.listItemText}
                                                roundAvatar
                                                key={i}
                                                underlayColor={UNDERLAY_COLOR}
                                                rightIcon={
                                                    <Icon name='close'
                                                          type='material-community'
                                                          color={CHECKMARK_COLOR}
                                                          onPress={() => this.removeInvitee(invitee)}
                                                    />
                                                }
                                                {...invitee}
                                            />
                                        ))
                                    }
                                </List>

                            </View>

                        </ScrollView>

                        {/*submit button to create the event*/}
                        <Button
                            raised
                            title='Complete'
                            borderRadius={4}
                            containerViewStyle={styles.submitButton}
                            buttonStyle={formStyles.button}
                            textStyle={formStyles.buttonText}
                            onPress={() => this.onSubmit()}
                        />

                    </SafeAreaView>

                </LinearGradient>

            </TouchableWithoutFeedback>
        );
    }
}

EventForm.propTypes = {
    editMode: PropTypes.bool,
    invitees: PropTypes.array,
    description: PropTypes.string,
    title: PropTypes.string,
};

EventForm.defaultProps = {
    editMode: false,
    invitees: [],
    description: '',
    title: '',
    startDate: '',
    endDate: '',
    address: '',
};

//allows the component to use props as specified by reducers
const mapStateToProps = (state) => {
    return {
        peopleReducer: state.peopleReducer,
        currentUser: state.authReducer.user,
        userLocation: state.feedReducer.location
    }
};

const actions = {
    createEvent,
    editEvent
};

export default connect(mapStateToProps, actions)(EventForm);

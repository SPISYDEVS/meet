import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {isEmpty} from '../../utils/validate'
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import moment from "moment";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import {createState, extractData, hasErrors} from "../../../../components/utils/formUtils";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "react-native-elements/src/buttons/Button";
import formStyles from "../../../../styles/formStyles";
import Modal from "react-native-modal";
import PlacePicker from "../../components/PlacePicker/PlacePicker";
import {DATE_FORMAT, GOOGLE_MAPS_PLACE_API_KEY} from "../../../../config/constants";
import {momentFromDate} from "../../../../components/utils/dateUtils";


import {createEvent} from "../../../../network/firebase/Event/actions";
import {reverseGeocode} from "../../../../network/googleapi/GoogleMapsAPI";


class EventForm extends React.Component {
    constructor() {
        super();

        this.form = {
            fields: {
                'title': {
                    placeholder: "Title",
                    type: "text",
                    validator: (title) => !isEmpty(title),
                    errorMessage: 'Title is required'
                },
                'description': {
                    placeholder: "Description",
                    multiline: true,
                    type: "text",
                },
                'date': {
                    options: {
                        format: DATE_FORMAT,
                        minuteInterval: 5,
                        mode: 'datetime',
                    },
                    value: moment().format(DATE_FORMAT),
                    type: 'date',
                },
                'location': {
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
                    value: {
                        latitude: 37.78825,
                        longitude: -122.4324
                    },
                    validator: (location) => !isEmpty(location),
                    errorMessage: "Location is required",
                    other: {
                        address: '',
                        modalVisible: false
                    }
                },
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
            data['data']['date'] = momentFromDate(data['data']['date']).valueOf();
            data['data']['address'] = this.state['location']['other']['address'];
            this.props.createEvent(data['data'], this.props.currentUser, this.onSuccess, this.onError);
        }

    };

    onSuccess() {
        Actions.Main()
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

    render() {

        const form = this.form;
        const [title, description, date, location] = Object.keys(this.form.fields);
        const address = this.state[location]['other']['address'];

        return (
            <View style={styles.container}>

                {/*input for the form title*/}
                <TextInput
                    {...form.fields[title]}
                    onChangeText={(text) => this.onChange(title, text)}
                    value={this.state[title]['value']}
                    error={this.state['error'][title]}
                />

                {/* Below is the input for the location field, which opens a modal when clicked*/}
                <View style={[formStyles.wrapper, formStyles.containerView]}>
                    <TouchableOpacity onPress={() => this.openLocationModal()}>
                        <Text>{address.length > 0 ? address : 'Choose a location'}</Text>
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
                    {...form.fields[description]}
                    onChangeText={(text) => this.onChange(description, text)}
                    value={this.state[description]['value']}
                    error={this.state['error'][description]}
                />

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
    }
};

export default connect(mapStateToProps, {createEvent})(EventForm);

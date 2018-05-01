import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as event} from "../../index"
import {isEmpty} from '../../utils/validate'
import {View} from "react-native";
import styles, {indicatorStyles, mapStyles} from "./styles";
import moment from "moment";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import {createState, extractData, hasErrors} from "../../../../components/utils/formUtils";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "react-native-elements/src/buttons/Button";
import formStyles from "../../../../styles/formStyles";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

const {createEvent} = event;

const generalPage = "General";
const wherePage = "Where";
const invitationsPage = "Invitations";

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
                        format: 'MMMM Do YYYY, h:mm a',
                        minuteInterval: 5,
                        mode: 'datetime',
                    },
                    value: moment().format("MMMM Do YYYY, h:mm a"),
                    type: 'date',
                },
                'location': {
                    placeholder: "Location",
                    type: "location",
                    minLength: 2,
                    fetchDetails: true,
                    // nearbyPlacesAPI: 'GoogleReverseGeocoding',
                    debounce: 200,
                    query: {
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyAOkeHdz33iLnUmkyWmoFoZ_B0otaz7ISY',
                        language: 'en', // language of the results
                    },
                    currentLocation: true, // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel: "Current location",
                    value: {lat: 0.0, long: 0.0},
                    validator: (location) => !isEmpty(location),
                    errorMessage: "Location is required"
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
            console.log(data['data']);
            this.props.createEvent(data['data'], this.onSuccess, this.onError);
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

    onChange = (key, data) => {
        const state = {...this.state};
        state[key]['value'] = data;
        this.setState(state);
    };

    render() {

        const form = this.form;
        const [title, description, date, location] = Object.keys(this.form.fields);

        return (
            <View style={styles.container}>
                <TextInput
                    {...form.fields[title]}
                    onChangeText={(text) => this.onChange(title, text)}
                    value={this.state[title]['value']}
                    error={this.state['error'][title]}
                />

                <GooglePlacesAutocomplete
                    {...form.fields[location]}
                    query={{
                        key: 'AIzaSyAOkeHdz33iLnUmkyWmoFoZ_B0otaz7ISY',
                        language: 'en'
                    }}
                    onPress={(place, details) => {
                        console.log(place);
                        console.log(details);
                        const region = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        };
                        {/* region.latitudeDelta = this.state['map']['value'].latitudeDelta;
                            region.longitudeDelta = this.state['map']['value'].longitudeDelta;
                            console.log(region);
                            console.log(this.state['map']['value']); */
                        }
                        this.onChange(location, region);
                    }}
                    styles={mapStyles}
                    fetchDetails={true}
                />

                <DatePicker
                    {...form.fields[date]}
                    value={this.state[date]['value']}
                    onDateChange={(newDate) => this.onChange(date, newDate)}
                />

                <TextInput
                    {...form.fields[description]}
                    onChangeText={(text) => this.onChange(description, text)}
                    value={this.state[description]['value']}
                    error={this.state['error'][description]}
                />

                <Button
                    raised
                    title='Next'
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

export default connect(null, {createEvent})(EventForm);

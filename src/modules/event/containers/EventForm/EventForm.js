import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as event} from "../../index"
import {isEmpty} from '../../utils/validate'
import {SafeAreaView, ScrollView, Text, View, Platform, Keyboard} from "react-native";
import {Icon} from 'react-native-elements';
import styles, {indicatorStyles, mapStyles} from "./styles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from "react-native-step-indicator";
import {ViewPager} from 'rn-viewpager';
import moment from "moment";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import {createState, extractData, hasErrors} from "../../../../components/utils/formUtils";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "react-native-elements/src/buttons/Button";
import formStyles from "../../../../styles/formStyles";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import MapView, {Marker} from "react-native-maps";
import {Constants, Location, Permissions} from 'expo';

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
                    errorMessage: 'EventDetails title is required'
                },
                'description': {
                    placeholder: "Description",
                    multiline: true,
                    type: "text",
                },
                'date': {
                    value: moment(),
                    options: {
                        format: 'MMMM Do YYYY, h:mm a',
                        minuteInterval: 5,
                        mode: 'datetime',
                    },
                    type: 'date',
                }
            }
        };

        this.state = createState(this.form.fields);

        //bind functions
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit = (page) => {

        const form = this.state[page];
        const data = extractData(form);

        if (hasErrors(data['error'])) {
            const newState = {...this.state};
            newState[page]['error'] = data['error'];
            this.setState(newState);
        } else {
            this.props.createEvent(data['data']);
            this.onSuccess();
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

    onChange = (form, key, data) => {
        const state = {...this.state};
        state[form][key]['value'] = data;
        this.setState(state);
    };

    render() {
        return (
            <View style={styles.container}>
                <View key={page}>
                    <TextInput
                        {...form.fields[title]}
                        onChangeText={(text) => this.onChange(page, title, text)}
                        value={this.state[page][title]['value']}
                        error={this.state[page]['error'][title]}/>

                    <TextInput
                        {...form.fields[description]}
                        onChangeText={(text) => this.onChange(page, description, text)}
                        value={this.state[page][description]['value']}
                        error={this.state[page]['error'][description]}/>

                    <DatePicker
                        {...form.fields[date]}
                        value={this.state[page][date]['value']}
                        onDateChange={(newDate) => this.onChange(page, date, newDate)}
                    />

                    <Button
                        raised
                        title='Next'
                        borderRadius={4}
                        containerViewStyle={formStyles.containerView}
                        buttonStyle={formStyles.button}
                        textStyle={formStyles.buttonText}
                        onPress={() => this.onSubmit(page)}/>

                </View>
            </View>
        );
    }
}

export default connect(null, {createEvent})(EventForm);

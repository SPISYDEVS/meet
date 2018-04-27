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
const PAGES = [generalPage, wherePage, invitationsPage];

class EventForm extends React.Component {
    constructor() {
        super();

        this.forms = {
            [generalPage]: {
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
            },
            [wherePage]: {
                fields: {
                    'map': {
                        placeholder: 'Search',
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
                        value: {lat: 0.0, long: 0.0}
                    }
                },
            },
            [invitationsPage]: {
                fields: {
                    'name': {
                        placeholder: "Name",
                        autoFocus: true,
                        type: "text",
                        validator: (name) => !isEmpty(name),
                        errorMessage: 'Invitee name is required'
                    },
                }

            }
        };

        const formKeys = Object.keys(this.forms);

        const state = {};

        formKeys.forEach((key) => {
            state[key] = createState(this.forms[key].fields);
        });


        state['currentPage'] = 0;

        this.state = state;

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
            const nextPage = this.state.currentPage + 1;
            this.toPage(nextPage);
        }

    };

    toPage = (page) => {
        this.setState({currentPage: page});
        this.viewPager.setPage(page);
    };

    onSuccess() {
        Actions.Main()
    }
    ;

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

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

    onChange = (form, key, data) => {
        const state = {...this.state};
        state[form][key]['value'] = data;
        this.setState(state);
    };

    onRegionChange = (region) => {
        console.log(region);
        // const location = {latitude: region.latitude + region.latitudeDelta/2, longitude: region.longitude + region.longitudeDelta/2}
        this.onChange(wherePage, 'map', region);
    };

    renderViewPagerPage = (page) => {

        const form = this.forms[page];

        if (page === generalPage) {

            const [title, description, date] = Object.keys(form.fields);

            return (
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
            )
        } else if (page === wherePage) {

            const [map] = Object.keys(form.fields);

            return <View key={page} style={{flex: 1}}>


                <GooglePlacesAutocomplete
                    {...form.fields[map]}
                    onPress={(place, details) => {
                        console.log(place);
                        console.log(details);
                        const region = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        };
                        region.latitudeDelta = this.state[page]['map']['value'].latitudeDelta;
                        region.longitudeDelta = this.state[page]['map']['value'].longitudeDelta;
                        console.log(region);
                        console.log(this.state[page]['map']['value']);
                        this.onChange(page, map, region);
                    }}
                    styles={mapStyles}
                    fetchDetails={true}
                />

                <View style={{flex: 1}}>
                    <MapView
                        style={{flex: 1}}
                        showsUserLocation
                        showsMyLocationButton={true}
                        region={this.state[page][map]['value']}
                        onRegionChangeComplete={(region) => this.onRegionChange(region)}
                    />
                    <View pointerEvents="none" style={styles.markerContainer}>
                        <Icon type="material-community" style={styles.marker} size={40} name="map-marker"/>
                    </View>
                </View>
            </View>

        } else if (page === invitationsPage) {

            const [name] = Object.keys(form.fields);

            return (
                <View key={page}>
                    <TextInput
                        {...form.fields[name]}
                        onChangeText={(text) => this.onChange(page, name, text)}
                        value={this.state[page][name]['value']}
                        error={this.state[page]['error'][name]}/>
                </View>
            )
        }

    };

    renderStepIndicator = params => {
        const {position} = params;

        return (<MaterialIcon {...getStepIndicatorIconConfig(params)}
                              onPress={position < this.state.currentPage ? () => this.toPage(position) : () => {
                              }}/>);
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.stepIndicator}>
                    <StepIndicator renderStepIndicator={this.renderStepIndicator} customStyles={indicatorStyles}
                                   currentPosition={this.state.currentPage}
                                   labels={["What", "Where", "When", "Who", "Review"]}/>
                </View>
                <ViewPager
                    style={styles.viewPager}
                    ref={(viewPager) => {
                        this.viewPager = viewPager
                    }}
                    onPageSelected={(page) => {
                        this.setState({currentPage: page.position})
                    }}
                    scrollEnabled={false}
                    horizontalScroll={false}
                >
                    {PAGES.map((page) => this.renderViewPagerPage(page))}
                </ViewPager>

            </View>
        );
    }
}

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 18,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'shopping-cart';
            break;
        }
        case 1: {
            iconConfig.name = 'location-on';
            break;
        }
        case 2: {
            iconConfig.name = 'assessment';
            break;
        }
        case 3: {
            iconConfig.name = 'payment';
            break;
        }
        case 4: {
            iconConfig.name = 'track-changes';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};


export default connect(null, {createEvent})(EventForm);

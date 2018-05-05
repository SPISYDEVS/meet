import React from 'react';
import PropTypes from 'prop-types';

import {Text, View, TouchableOpacity} from 'react-native';

import styles, {autocompleteStyles} from "./styles"
import {Avatar, Icon} from "react-native-elements";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {MapView} from "expo";

class PlacePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                ...this.props.location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        }
    }

    onRegionChange = (region) => {
        this.setState({region: region});
        this.props.onLocationChange({latitude: region.latitude, longitude: region.longitude});
    };

    render() {


        const {options} = this.props;

        return (
            <View style={{flex: 1}}>
                <GooglePlacesAutocomplete
                    {...options}
                    onPress={(place, details) => {
                        const newRegion = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        };
                        newRegion.latitudeDelta = this.state['region'].latitudeDelta;
                        newRegion.longitudeDelta = this.state['region'].longitudeDelta;
                        this.onRegionChange(newRegion);
                    }}
                    styles={autocompleteStyles}
                    fetchDetails={true}
                />

                <View style={{flex: 1}}>
                    <MapView
                        style={{flex: 1}}
                        showsUserLocation
                        showsMyLocationButton={true}
                        initialRegion={this.state.region}
                        onRegionChangeComplete={(region) => this.onRegionChange(region)}
                    />
                    <View pointerEvents="none" style={styles.markerContainer}>
                        <Icon type="material-community" style={styles.marker} size={40} name="map-marker"/>
                    </View>
                </View>
            </View>
        );
    }
}

PlacePicker.propTypes = {
    location: PropTypes.object.isRequired,
    onLocationChange: PropTypes.func.isRequired,
    options: PropTypes.object
};

PlacePicker.defaultProps = {
    options: {
        placeholder: 'Search',
        minLength: 2,
        fetchDetails: true,
        debounce: 200,
        query: {
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAOkeHdz33iLnUmkyWmoFoZ_B0otaz7ISY',
            language: 'en', // language of the results
        },
        currentLocation: true, // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel: "Current location",
    },
};

export default PlacePicker;
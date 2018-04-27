import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {windowWidth, fontSize, fontFamily, normalize, color} = theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        height: '100%'
    },
    stepIndicator: {
        marginVertical: 20,
    },
    viewPager: {
        flex: 1,
    },
    markerContainer:{
        position: 'absolute',
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 40,
        width: 40,
        // backgroundColor: 'transparent'
    }
});

export const mapStyles = {
    container: {
        zIndex: 10,
        overflow: 'visible',
        height: 50,
        flexGrow: 0,
        flexShrink: 0
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: color.white
    },
    listView: {
        position: 'absolute',
        top: 42,
        // left: 10,
        // right: 10,
        backgroundColor: color.white,
        // borderRadius: 5,
        flex: 1,
        // elevation: 3,
        zIndex: 10
    },
    description: {
        color: color.black
    },
    predefinedPlacesDescription: {
        color: color.black
    }
};

export const indicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: color.main,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: color.main,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: color.main,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: color.main,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: color.main,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: color.main
};

export default styles;
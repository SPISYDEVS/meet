import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { windowWidth, fontSize, fontFamily, normalize, color } = theme;

const styles = StyleSheet.create({
    container:{
        backgroundColor: color.white,
        height: '100%'
    },
    stepIndicator: {
        marginVertical:20,
    },
    viewPager: {
        flex: 1,
    }
});

export const indicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:40,
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
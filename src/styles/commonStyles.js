import {StyleSheet} from 'react-native';
import * as theme from './theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily} = theme;

const commonStyles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: color.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hidden: {
        opacity: 0,
        height: 0,
    },
});

export default commonStyles;
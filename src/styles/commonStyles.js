import {StyleSheet} from 'react-native';
import * as theme from './theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily} = theme;

const commonStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: color.text,
        fontSize: fontSize.large,
        opacity: 0.75,
        textAlign: 'center'
    },
    hidden: {
        opacity: 0,
        height: 0,
    },
});

export default commonStyles;
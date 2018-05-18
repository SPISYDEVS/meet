import {StyleSheet} from 'react-native';
import * as theme from './theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily} = theme;

const headerStyles = StyleSheet.create({
    padded: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flexShrink: 1,
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flexShrink: 1,
    },
    headerText: {
        fontSize: fontSize.large + 5,
        fontFamily: fontFamily.bold,
        color: color.text
    }
});

export default headerStyles;

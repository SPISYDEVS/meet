import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';

const { color, padding, windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        marginBottom: 10,
    },

    titleContainer: {
        marginHorizontal: padding.horizontal * 2.5,
        flex: 1,
    },

    titleText: {
        fontSize: fontSize.header,
        fontFamily: fontFamily.bold,
        color: color.text,
    },

    sliderContainer: {
        marginHorizontal: padding.horizontal * 2,
    },
    sliderText: {
        color: color.text
    }
});

export default styles;
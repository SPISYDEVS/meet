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

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(65),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: "#A5A7A9"
    },

    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
    }
});

export default styles;
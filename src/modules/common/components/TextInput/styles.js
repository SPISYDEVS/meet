import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { color, windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(65),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        color: color.text,
        borderBottomColor: color.text
    }
});

export default styles;
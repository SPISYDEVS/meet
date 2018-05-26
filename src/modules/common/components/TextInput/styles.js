import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { color, windowWidth, fontSize, fontFamily, normalize, padding } = theme;

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginHorizontal: padding.horizontal,
        marginBottom: padding.vertical * 2,
    },

    inputContainer:{
        padding: 0,
        margin: 0,
        width: '100%',
        // height: normalize(65),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        color: color.text,
        borderBottomColor: color.text
    }
});

export default styles;
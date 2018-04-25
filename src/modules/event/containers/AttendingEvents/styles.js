import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 15
    },

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(65),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: "#A5A7A9"
    }
});

export default styles;
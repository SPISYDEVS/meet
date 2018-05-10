import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { windowWidth, color, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },
    inputContainer:{
        width: windowWidth - 40,
        height: normalize(55),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: "#A5A7A9"
    },
    modal:{
        margin: 0,
        padding: 0,
    },
    modalContainer:{
        backgroundColor: color.background,
        flex: 1
    }
});

export default styles;
import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { windowWidth, color, fontSize, fontFamily, normalize, padding } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: padding.vertical * 2
    },
    inputContainer:{
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: color.text,
        color: color.text
    },
    labelContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
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
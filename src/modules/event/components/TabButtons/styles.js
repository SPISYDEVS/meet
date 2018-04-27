import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 30,
        maxHeight: 30,
        flexDirection: 'row',
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.accent_dark,
        borderRadius: 6,
        overflow: 'hidden',
        marginVertical: 5,
        marginHorizontal: 15
    },
    selectedButton:{
        flex: 1,
        backgroundColor: color.accent_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.75,
        borderRightColor: color.accent_dark
    },
    selectedText:{
        color: color.white
    },
    button:{
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderRightColor: color.accent_dark
    },
    text:{
        color: color.accent_dark,
    },
});


export default styles;
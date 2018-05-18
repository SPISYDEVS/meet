import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 30,
        maxHeight: 30,
        flexDirection: 'row',
        backgroundColor: color.accent_dark,
        borderWidth: 1,
        borderColor: color.accent_dark,
        borderRadius: 6,
        overflow: 'hidden',
        marginVertical: padding.vertical * 0.5,
        marginBottom: padding.vertical * 2,
        marginHorizontal: 15
    },
    selectedButton:{
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: color.white
    },
    selectedText:{
        color: color.accent_dark
    },
    button:{
        flex: 1,
        backgroundColor: color.accent_dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: color.white,
    },
});


export default styles;
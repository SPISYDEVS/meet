import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 30,
        flexDirection: 'row',
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.main,
        borderRadius: 6,
        overflow: 'hidden',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    selectedButton:{
        flex: 1,
        backgroundColor: color.main,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedText:{
        color: color.white
    },
    button:{
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        color: color.main,
    },
});


export default styles;
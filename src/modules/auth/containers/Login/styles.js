import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    button:{
        borderRadius: 50,
        backgroundColor: color.white,
        height: 55
    },

    containerView:{
        marginVertical: padding.vertical * 3,
        alignSelf: 'center',
        shadowOpacity: 0,
        width: (windowWidth - 70)
    },

    formInputsContainer:{
        marginBottom: 70,
    },
    buttonText:{
        color: color.black
    },

    container:{
        marginTop: 100,
        flex: 1,
        paddingHorizontal: padding.horizontal * 2,
    }
});


export default styles;

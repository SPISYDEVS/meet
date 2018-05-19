import { StyleSheet } from 'react-native';
import * as theme from './theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const formStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: padding.horizontal * 2,
    },
    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
        marginBottom: padding.vertical*3,
        marginLeft: 0,
        marginRight: 0,
    },

    containerView:{
        marginVertical: padding.vertical * 3,
        alignSelf: 'center',
        shadowOpacity: 0,
        width: (windowWidth - 40)
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        // backgroundColor: color.main,
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        shadowOpacity: 0,

        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    forgotText:{
        textAlign:"center",
        color:color.black,
        marginBottom: padding.vertical,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
    }
});

export default formStyles;
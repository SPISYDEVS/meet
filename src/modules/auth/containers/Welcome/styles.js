import { StyleSheet } from 'react-native';
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    topContainer:{
        flex:4,
        paddingHorizontal:15,
        justifyContent:"center",
        alignItems:"center",
    },

    image:{
        // backgroundColor: 'transparent',
        // borderRadius: 50,
        marginBottom: padding.vertical,
        // resizeMode
    },

    title:{
        fontSize: fontSize.header,
        fontFamily: fontFamily.extrabold,
        color:color.white,
        letterSpacing: 2
    },

    //===============================

    bottomContainer:{
        flex: 2,
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },

    containerView:{
        width: windowWidth - 40,
        overflow: 'hidden'
    },

    socialButton:{
        height: normalize(55),
        borderRadius: 50,
        marginTop:0,
        marginBottom:padding.vertical*3
    },

    socialButtonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
    },
    button:{
        borderRadius: 50,
        backgroundColor: color.white,
        height: 55,
        overflow: 'hidden'
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
        color: color.welcome_gradient5
    },

    bottom:{
        flexShrink: 1,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom: padding.vertical
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        marginRight: 5,
        color: color.text,
        opacity: 0.8
    },

    signInText:{
        fontSize: fontSize.regular,
        color: color.text,
        fontFamily: fontFamily.medium
    },

    orContainer:{
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth - padding.horizontal*2,
    },
    orText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: color.text,
        paddingHorizontal: padding.horizontal
    }
});

export default styles;
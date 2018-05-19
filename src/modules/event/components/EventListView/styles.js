import {Platform, StyleSheet} from 'react-native';
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        backgroundColor: color.background,
        flex: 1,

        ...Platform.select({
            ios: {
                paddingHorizontal: padding.horizontal,
                paddingVertical: padding.vertical,
            },
            android: {
                marginHorizontal: padding.horizontal,
                marginVertical: padding.vertical,
            },
        }),
    },

    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding.vertical * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    }
});

export default styles;

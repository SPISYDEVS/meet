import { StyleSheet } from 'react-native';
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.background,
        marginHorizontal: padding.horizontal * 2.5,
        paddingVertical: padding.vertical * 0.8
    },
    infoContainer: {
        flex: 1,
        paddingVertical: 25,
        justifyContent: 'center',
    },
    infoContent: {
        flexDirection: 'row',
    },
    detailsContainer:{
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    username: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.text
    },
    school: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: color.text
    },
    body: {
        flex: 5
    },
    bottomContent:{
        flex: 1,
    },
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    active: {
        flex: 1,
    },
    hidden: {
        opacity: 0,
        height: 0,
    }
});

export default styles;
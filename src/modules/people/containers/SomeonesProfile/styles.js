import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 25,
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
        fontFamily: fontFamily.bold
    },
    school: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    },
    body: {
        flex: 5
    },
    bottomContent:{
        flex: 1,
        marginTop: 15,
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    }
});

export default styles;
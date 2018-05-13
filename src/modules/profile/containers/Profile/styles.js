import { StyleSheet } from 'react-native';
import * as theme from "../../../../styles/theme";
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
        marginTop: 15,
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    }
});

export default styles;
import {StyleSheet} from 'react-native';
import * as theme from "../../../../styles/theme";

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: color.background,
        paddingHorizontal: padding.horizontal * 2.5,
        paddingVertical: padding.vertical,
    },
    infoContainer: {
        flex: 1,
    },
    infoContent: {
        flexDirection: 'row',
    },
    detailsContainer: {
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
    bottomContent: {
        flex: 1,
        marginTop: 15,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {},
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        opacity: 1,
    },
    main: {
        flex: 2
    },
    modalBottom: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    text: {
        color: color.text,
        fontSize: fontSize.large
    }
});

export default styles;

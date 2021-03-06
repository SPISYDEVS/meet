import { StyleSheet } from 'react-native';
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    avatar: {

    },
    userInfo: {
        paddingLeft: 10,
        flex: 1,
    },
    text: {
        fontFamily: fontFamily.bold,
        color: color.text
    },
    subText: {
        fontFamily: fontFamily.regular,
        color: color.text,
        opacity: 0.8
    }
});

export default styles;
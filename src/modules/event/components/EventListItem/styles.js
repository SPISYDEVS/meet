import { StyleSheet } from 'react-native';
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize, lineHeight } = theme;

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
    eventInfo: {
        paddingLeft: 10,
        flex: 1,
    },
    title: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.text
    },
    address: {
        fontSize: fontSize.small,
        fontFamily: fontFamily.medium,
        lineHeight: lineHeight.paragraph,
        color: color.white,
        opacity: 0.9,
        overflow: 'hidden',
    },
});

export default styles;
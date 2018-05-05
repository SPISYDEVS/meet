import { StyleSheet } from 'react-native';
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: color.background,
        alignContent: 'center',
        paddingVertical: 10
    },
    descriptionContainer:{
        flex: 1,
    },
    actionButton: {
        paddingHorizontal: 3,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.large
    },
    description: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular
    }
});

export default styles;
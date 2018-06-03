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
            },
            android: {
                marginHorizontal: padding.horizontal,
            },
        }),
    },
});

export default styles;

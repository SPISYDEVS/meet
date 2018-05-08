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
        flex: 1
    }
});

export default styles;
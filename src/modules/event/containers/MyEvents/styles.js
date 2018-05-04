import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { color, windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        backgroundColor: color.background,
    },
    content:{
        paddingTop: 15,
        flex: 1
    }
});

export default styles;
import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const { color, windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        backgroundColor: color.main,
        opacity: 1
    },
    searchBar:{
        backgroundColor: color.main,
        borderRadius: 8,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
});

export default styles;
import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';
import {padding} from '../../../../styles/theme';

const {color, windowWidth, fontSize, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.background,
        opacity: 1,
        flex: 1,
        marginHorizontal: padding.horizontal
        // justifyContent: 'center',
    },
    listContainer: {
        marginTop: 0,
        paddingTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    listItemContainer: {
        backgroundColor: color.background,
        borderBottomColor: color.white,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    listItemText: {
        color: color.white
    },
    listItemUnderlayColor: {
        color: color.light_grey
    },
    searchContainer:{
        paddingRight: 10,
        paddingVertical: 0.5,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchBar: {
        padding: 0,
        margin: 0,
        backgroundColor: color.background,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchInput: {
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: color.background,
        borderColor: color.white,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.black
    },
});

export default styles;
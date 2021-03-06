import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, windowWidth, fontSize, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.background,
        opacity: 1,
        flex: 1,
        // justifyContent: 'center',
    },
    listContainer: {
    },
    searchContainer:{
        paddingRight: 10,
        paddingVertical: 0.5,
    },
    searchBar: {
        padding: 0,
        margin: 0,
        marginBottom: 25,
        backgroundColor: color.background,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchInput: {
        borderRadius: 12,
        borderWidth: 0.5,
        backgroundColor: color.background,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.black
    },
});

export default styles;
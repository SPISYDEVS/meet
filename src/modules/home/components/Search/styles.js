import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, windowWidth, fontSize, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.main,
        opacity: 1,
        // justifyContent: 'center',
    },
    cappedContainer: {
        maxHeight: 47
    },
    padded: {
        paddingHorizontal: 20,
        paddingVertical: 7.5,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flexShrink: 1,
    },
    searchContainer:{
        paddingRight: 10,
        paddingVertical: 0.5,
    },
    searchBar: {
        padding: 0,
        margin: 0,
        backgroundColor: color.main,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1
    },
    searchInput: {
        borderRadius: 12,
        backgroundColor: color.white,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.white
    }
});

export default styles;
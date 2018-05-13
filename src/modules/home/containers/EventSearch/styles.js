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
    padded: {
        paddingHorizontal: 20,
        paddingVertical: 4,
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
        paddingHorizontal: 0,
        paddingVertical: 9,
        margin: 0,
        backgroundColor: color.background,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: color.text,
        flex: 1
    },
    searchInput: {
        borderRadius: 12,
        borderWidth: 0.5,
        backgroundColor: color.white,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.text
    }
});

export default styles;
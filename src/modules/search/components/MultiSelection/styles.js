import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import * as theme from '../../../../styles/theme';
const {color, windowWidth, padding, fontSize, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.background,
        opacity: 1,
        flex: 1,
        marginHorizontal: padding.horizontal * 2,
        // justifyContent: 'center',
    },
    listViewContainer: {
        flex: 10,
        backgroundColor: color.background,
    },
    listContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchContainer: {
        paddingRight: 10,
        paddingVertical: 0.5,
    },
    searchBar: {
        padding: 0,
        margin: 0,
        backgroundColor: color.background,
        borderTopWidth: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: color.white,
    },
    searchInput: {
        // borderRadius: 12,
        backgroundColor: color.background,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.black
    },
    bottomBar: {
        backgroundColor: color.black,
        flexDirection: 'row',
        ...ifIphoneX({
            height: 70,
            paddingBottom: 20,
        }, {
            maxHeight: 50,
        }),
    },
    addButton: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    addButtonText: {
        fontSize: fontSize.regular + 2,
        color: '#FCFCFC',
        textAlign: 'center'
    },
    profileScrollView: {
        flex: 4,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
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
    avatarListItem: {
        maxWidth: 50,
        maxHeight: 50,
        borderBottomColor: color.black
    }
});

export default styles;
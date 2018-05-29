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
    listViewContainer: {
        flex: 10,
        backgroundColor: color.background,
    },
    listContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchContainer:{
        paddingRight: 10,
        paddingVertical: 0.5,
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
        borderWidth: 0.5,
        backgroundColor: color.white,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.black
    },
    bottomBar: {
        backgroundColor: color.black,
        flex: 1,
        maxHeight: 50,
        flexDirection: 'row',
    },
    bottomSafeArea: {
        backgroundColor: color.black,
        flex: 1,
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemContainer: {
        backgroundColor: color.background,
        borderBottomColor: color.white,
        borderTopWidth: 0,
        borderBottomWidth: 1,
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
import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';
import {padding} from "../../../../styles/theme";

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
        backgroundColor: color.text,
    },
    headerText: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        color: color.text
    },

    viewPager: {
        flex:1,
        flexDirection: 'column-reverse',
        backgroundColor: color.background
    },
    indicatorContainer:{
        borderTopWidth: 0,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    tabText:{
        color: color.text,
        fontSize: fontSize.medium,
        opacity: 0.75
    },
    selectedTabText:{
        color: color.text,
        fontSize: fontSize.medium,
    },
    selectedItem: {
        paddingBottom: padding.vertical*0.5,
        borderBottomWidth: 1,
        borderBottomColor: color.text,
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: padding.horizontal * 2
    }
});

export default styles;
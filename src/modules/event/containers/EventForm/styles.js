import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {windowWidth, padding, fontSize, fontFamily, normalize, color} = theme;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.background,
        height: '100%'
    },
    content: {
        marginHorizontal: padding.horizontal * 2,
    },
    modal: {
        margin: 0,
        paddingTop: 35,
        backgroundColor: color.white
    },
    locationContainer: {
        marginBottom: padding.vertical * 2,
        borderBottomWidth: 1,
        borderBottomColor: color.white,
    },
    locationPre: {
        color: color.text,
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
    },
    locationPost: {
        color: color.text,
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
    },
    invitationsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemContainer: {
        backgroundColor: color.white,
        borderBottomColor: color.white,
    },
    listItemText: {
        color: color.black
    },
    listItemUnderlayColor: {
        color: color.light_grey
    },
    text: {
        color: color.text
    }
});

export const mapStyles = {
    container: {
        overflow: 'visible',
        zIndex: 5
        // height: 50,
        // flexGrow: 0,
        // flexShrink: 0
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: color.white
    },
    listView: {
        zIndex: 5
        // position: 'absolute',
        // top: 42,
        // // left: 10,
        // // right: 10,
        // backgroundColor: color.white,
        // // borderRadius: 5,
        // flex: 1,
        // // elevation: 3,
        // zIndex: 10
    },
    description: {
        color: color.black
    },
    predefinedPlacesDescription: {
        color: color.black
    },
    markerContainer: {
        position: 'absolute',
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height: 40,
        width: 40,
        // backgroundColor: 'transparent'
    },
};

export const dateStyles = {
    dateInput: {
        padding: 0,
        borderWidth: 0,
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: color.text,
        marginBottom: padding.vertical * 2,
    },
    dateText: {
        color: color.text,
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
    }
};

export default styles;

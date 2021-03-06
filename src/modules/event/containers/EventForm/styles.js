import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {windowWidth, padding, fontSize, fontFamily, normalize, color} = theme;

const styles = StyleSheet.create({
    container: {
        paddingTop: padding.vertical * 2,
        height: '100%'
    },
    textInputContainer: {
        height: 30,
        marginBottom: padding.vertical * 2
    },
    tagContainer: {
        marginTop: 4,
        marginBottom: padding.vertical * 2
    },
    inputContainer: {
        height: 30,
        marginVertical: padding.vertical
    },
    content: {
        marginHorizontal: padding.horizontal * 3,
    },
    modal: {
        margin: 0,
        paddingTop: 35,
        backgroundColor: color.background
    },
    modalHeader: {
        flexDirection: 'row',
        marginHorizontal: padding.horizontal * 0.5,
        marginVertical: padding.vertical
    },
    modalContent: {
        flex: 1,
    },
    locationContainer: {
        height: 30,
        marginVertical: padding.vertical * 2
    },
    locationPre: {
        color: color.text,
        fontSize: fontSize.regular + 2,
        opacity: 0.75
    },
    locationPost: {
        color: color.text,
        fontSize: fontSize.regular + 2,
    },
    invitationsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: color.white,
    },
    userInfo: {
        paddingLeft: 10,
        flex: 1,
    },
    text: {
        color: color.text
    },
    submitButton: {
        flexShrink: 1,
        marginVertical: padding.vertical * 2,
        alignSelf: 'center',
        shadowOpacity: 0,
        width: (windowWidth - 40)
    },
    tagFlatList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },
    dateText: {
        color: color.text,
        fontSize: fontSize.regular + 2,
    },
    placeholderText: {
        color: color.text,
        opacity: 0.75,
        fontSize: fontSize.regular + 2,
    }
};

export default styles;

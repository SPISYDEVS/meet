import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight} = theme;

export const commentStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        paddingVertical: 8
    },
    avatar: {},
    comment: {
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        marginBottom: padding.vertical * 0.25,
    },
    text: {
        fontFamily: fontFamily.bold,
        color: color.text,
        paddingLeft: padding.horizontal,
        paddingRight: padding.horizontal * 0.5,
    },
    subText: {
        fontFamily: fontFamily.regular,
        color: color.text,
        opacity: 0.8
    },
    details: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        // flexWrap: 'wrap',
        // paddingLeft: padding.horizontal * 2.5,
        // paddingRight: padding.horizontal * 2.5,
        marginLeft: padding.horizontal * 2.5,
        marginRight: padding.horizontal * 2.5,
    },
    comments: {
        paddingLeft: padding.horizontal * 2.5,
        paddingRight: padding.horizontal * 2.5,
        flex: 1,
    },
    commentInputContainer: {
        paddingHorizontal: padding.horizontal * 1.5,
        paddingVertical: padding.vertical * 1.5,
        // backgroundColor: color.black,
    },
    commentInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: padding.vertical,
        paddingBottom: padding.vertical,
        backgroundColor: color.white,
        borderRadius: 33,
    },
    commentInputText: {
        color: color.black,
        fontSize: fontSize.regular,
        justifyContent: 'flex-start',
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: padding.horizontal * 1.5,
    },
    postButton: {
        flexShrink: 1,
        justifyContent: 'center',
    },
    postButtonText: {
        paddingRight: padding.horizontal * 1.5,
    },
    emptyCommentsText: {
        fontSize: fontSize.large,
        color: color.text
    }
});


export default styles;

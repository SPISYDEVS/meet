import {Platform, StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight} = theme;

const styles = StyleSheet.create({

    shadowWrapper: {
        flex: 1,
        height: '100%',
        flexWrap: 'wrap',
        marginVertical: 5,
        backgroundColor: color.background,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    container: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'column',
    },
    topContainer: {
        padding: 6,
    },
    botContainer: {
        height: 6,
        backgroundColor: color.main,
    },
    header: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold
    },
    dateText: {
        fontSize: fontSize.small,
        color: color.accent_dark
    },
    distanceText: {
        fontSize: fontSize.small,
        fontFamily: fontFamily.bold,
        color: color.accent_dark
    },
    headerLeft: {
        flex: 1.5,
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    body: {
        marginBottom: 7.5,
    },
    description: {
        fontSize: fontSize.small,
        fontFamily: fontFamily.medium,
        lineHeight: lineHeight.paragraph,
        opacity: 0.75,
        overflow: 'hidden',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        paddingBottom: 2.5
    },
    hostName: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontFamily: fontFamily.bold
    },
});


export default styles;

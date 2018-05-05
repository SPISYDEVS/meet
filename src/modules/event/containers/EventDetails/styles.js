import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexWrap: 'wrap',
        padding: 15,
        backgroundColor: color.background,
    },
    header: {
    },
    title: {
        fontSize: fontSize.header,
        fontFamily: fontFamily.bold,
        marginBottom: 10
    },
    subtitle: {
        fontSize: 18,
        lineHeight: 30,
        marginBottom: 5,
    },
    details: {
        marginBottom: 25,
    },
    description: {
        fontSize: fontSize.regular,
        lineHeight: lineHeight.paragraph
    },
    hostContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    hostName: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontFamily: fontFamily.bold
    },
    boldSubtitle: {
        fontSize: 18,
        fontFamily: fontFamily.bold,
    },
    attendeesContainer: {
        marginBottom: 10
    },
    attendees: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10
    }
});


export default styles;

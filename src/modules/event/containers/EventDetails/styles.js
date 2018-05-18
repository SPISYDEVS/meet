import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexWrap: 'wrap',
        padding: 15,
        backgroundColor: color.background
    },
    navBar:{
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 4,
    },
    header: {
    },
    title: {
        fontSize: fontSize.header,
        fontFamily: fontFamily.bold,
        color: color.text,
        marginBottom: 10
    },
    subtitle: {
        fontSize: fontSize.regular,
        color: color.text,
        lineHeight: 15,
        opacity: 0.9,
        marginBottom: 5,
    },
    details: {
        marginBottom: 25,
    },
    description: {
        fontSize: fontSize.regular,
        color: color.text,
        lineHeight: lineHeight.paragraph
    },
    hostContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 10,
    },
    hostName: {
        color: color.text,
        paddingLeft: 10,
        alignSelf: 'center',
        fontFamily: fontFamily.bold
    },
    boldSubtitle: {
        color: color.text,
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

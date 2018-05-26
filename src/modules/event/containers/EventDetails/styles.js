import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexWrap: 'wrap',
        padding: padding.horizontal * 2.5,
    },
    navBar:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: padding.horizontal * 1.75,
        paddingBottom: 4,
    },
    header: {
        marginBottom: padding.vertical * 3
    },
    title: {
        fontSize: fontSize.header,
        fontFamily: fontFamily.bold,
        color: color.text,
    },
    subHeader: {
        marginBottom: padding.vertical * 5,
    },
    date: {
        fontSize: fontSize.medium,
        color: color.text,
        opacity: 0.9,
        marginBottom: padding.vertical,
    },
    location: {
        fontSize: fontSize.medium,
        color: color.text,
        opacity: 0.9,
    },
    details: {
        marginBottom: padding.vertical * 1.5
    },
    description: {
        fontSize: fontSize.regular,
        color: color.text,
        lineHeight: lineHeight.paragraph
    },
    hostContainer: {
        flexDirection: 'row',
        marginBottom: padding.vertical * 1.8,
    },
    hostName: {
        color: color.text,
        paddingLeft: padding.horizontal,
        alignSelf: 'center',
        fontFamily: fontFamily.bold
    },
    boldSubtitle: {
        color: color.text,
        fontSize: 18,
        fontFamily: fontFamily.bold,
    },
    attendeesContainer: {
        marginVertical: padding.vertical
    },
    attendees: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10
    }
});


export default styles;

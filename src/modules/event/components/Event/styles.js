import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        flexWrap: 'wrap',
        //paddingHorizontal: 5,
        overflow: 'hidden',
        marginBottom: 10,
        zIndex: 3,
        elevation: 3,
        borderRadius: 8,
    },
    topContainer: {
        paddingHorizontal: 5,
    },
    botContainer: {
      height: 3,
      backgroundColor: 'red',
    },
    info: {
        marginBottom: 10,
    },
    title: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold
    },
    subtitle: {
        fontSize: fontSize.regular,
    },
    details: {
        marginBottom: 7.5,
    },
    description: {
        fontSize: fontSize.regular,
        lineHeight: lineHeight.paragraph
    },
    hostContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        paddingBottom: 10
    },
    hostName: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontFamily: fontFamily.bold
    },
    modal: {
        margin: 0,
        padding: 10,
        backgroundColor: color.white
    },
    modalHeader: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingTop: 25,
        paddingRight: 10,
    }
});


export default styles;

import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexWrap: 'wrap',
    },
    info: {
        marginBottom: 7.5,
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
        paddingBottom: 5
    },
    hostName: {
        paddingLeft: 10,
        alignSelf: 'center'
    }
});


export default styles;
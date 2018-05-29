import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {windowWidth, color, fontSize, fontFamily, normalize, padding} = theme;

const styles = StyleSheet.create({
    containerView: {
        width: windowWidth - 40,
        overflow: 'hidden'
    },

    socialButton: {
        height: normalize(55),
        borderRadius: 50,
        marginTop: 0,
        marginBottom: padding.vertical * 3
    },

    button: {
        borderRadius: 50,
        backgroundColor: color.white,
        height: 55,
        overflow: 'hidden'
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
        color: color.welcome_gradient5
    }
});

export default styles;
import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';
import {ifIphoneX} from "react-native-iphone-x-helper";

const {windowWidth, color, fontSize, fontFamily, normalize, padding} = theme;

const styles = StyleSheet.create({
    containerView: {
        width: windowWidth - 40,
        overflow: 'hidden',
        alignSelf: 'center',
        marginLeft: 0,
        marginRight: 0,
    },

    buttonContainer: {
        height: normalize(55),
        borderRadius: 50,
        marginHorizontal: 0,
        marginTop: padding.vertical * 2,
        ...ifIphoneX({
            marginBottom: padding.vertical * 4,
        }, {
            marginBottom: padding.vertical * 2,
        }),
    },

    button: {
        borderRadius: 50,
        backgroundColor: color.white,
        height: 55,
        marginHorizontal: 0,
        overflow: 'hidden'
    },

    disabled: {
        opacity: 0.82,
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
    }
});

export default styles;
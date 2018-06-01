import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {windowWidth, color, fontSize, fontFamily, normalize, padding} = theme;

const styles = StyleSheet.create({
    containerView: {
        alignSelf: 'flex-start',
        overflow: 'hidden',
        height: normalize(25),
        borderRadius: 33,
        backgroundColor: color.white,
        marginLeft: 0,
        marginRight: padding.horizontal * 0.5,
        marginVertical: 0,
        paddingLeft: padding.horizontal,
        paddingRight: padding.horizontal * 0.7,
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: fontSize.small,
        fontFamily: fontFamily.medium,
        paddingRight: padding.horizontal * 0.3,
    }
});

export default styles;
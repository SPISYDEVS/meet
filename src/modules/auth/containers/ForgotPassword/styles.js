import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight} = theme;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginHorizontal: padding.horizontal * 3,
        flex: 1,
        // paddingHorizontal: padding.horizontal * 2,
    },
    formInputsContainer: {
        marginBottom: 60,
    },
    forgotText: {
        textAlign: "center",
        color: color.white,
        marginBottom: padding.vertical,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
    }
});


export default styles;

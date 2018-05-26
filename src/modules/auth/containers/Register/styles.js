import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight} = theme;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginHorizontal: padding.horizontal,
        flex: 1,
        paddingHorizontal: padding.horizontal * 2,
    },
    button: {
        borderRadius: 50,
        backgroundColor: color.white,
        height: 55
    },
    containerView: {
        marginVertical: padding.vertical * 3,
        alignSelf: 'center',
        shadowOpacity: 0,
        width: (windowWidth - 70)
    },
    formInputsContainer: {
        marginBottom: 60,
    },
    buttonText: {
        color: color.welcome_gradient5
    },
});


export default styles;

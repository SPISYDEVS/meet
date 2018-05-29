import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {windowWidth, fontSize, color, fontFamily, normalize, padding} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: padding.horizontal * 2,
    },
});

export default styles;
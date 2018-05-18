import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const {color, padding, windowWidth, fontSize, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: color.background,
        paddingHorizontal: 0,
    },
    content: {
        flex: 1,
    },
    active: {
        flex: 1,
    },
    hidden: {
        opacity: 0,
        height: 0,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
    },
    emptyText: {
        color: color.text,
        fontSize: fontSize.large,
        opacity: 0.75
    }
});

export default styles;
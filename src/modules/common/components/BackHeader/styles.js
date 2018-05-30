import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    backHeader:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: padding.vertical,
        paddingBottom: 4,
    },
    leftHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rightHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    leftButtonPadding: {
        paddingLeft: padding.horizontal
    },
    rightButtonPadding: {
        paddingRight: padding.horizontal
    }
});


export default styles;
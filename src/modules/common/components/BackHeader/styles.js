import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    backHeader:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: padding.vertical*3,
        paddingHorizontal: padding.horizontal * 1.75,
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
        alignItems: 'center'
    },
    buttonPadding: {
        paddingLeft: padding.horizontal * 0.5,
        paddingRight: padding.horizontal * 0.5
    }
});


export default styles;
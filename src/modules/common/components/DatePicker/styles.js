import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    containerView:{
        height: '100%',
        width: '100%',
    },
    dateContainer:{
        height: 25,
        width: '100%',
    }
});


export default styles;
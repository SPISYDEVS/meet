import {StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';

const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    containerView:{
        marginBottom: padding.vertical * 2,
        width: '100%'
    },
    dateContainer:{
        width: '100%'
    }
});


export default styles;
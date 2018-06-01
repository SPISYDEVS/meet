import {Platform, StyleSheet} from 'react-native';

import * as theme from '../../../../styles/theme';
import {ifIphoneX} from "react-native-iphone-x-helper";
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    markerContainer:{
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
    },
    marker: {
        height: 40,
        width: 40,
        // backgroundColor: 'transparent'
    },
});

export const autocompleteStyles = {
    container: {
        zIndex: 10,
        overflow: 'visible',
        flexGrow: 0,
        flexShrink: 0
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: color.background,
        height: 62,
        borderTopWidth: 0,
        borderBottomWidth:0
    },
    textInput: {
      alignSelf: 'center'
    },
    listView: {
        position: 'absolute',
        top: 52,
        backgroundColor: color.background,
        flex: 1,
        maxHeight: 300,
        ...Platform.select({
            ios: {
                zIndex: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    description: {
        color: color.text
    },
    predefinedPlacesDescription: {
        color: color.text
    }
};

export default styles;
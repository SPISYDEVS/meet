import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    markerContainer:{
        position: 'absolute',
        flex: 1,
        top: 0,
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
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
        // left: 10,
        // right: 10,
        backgroundColor: color.background,
        // borderRadius: 5,
        flex: 1,
        // elevation: 3,
        maxHeight: 300,
        zIndex: 10
    },
    description: {
        color: color.text
    },
    predefinedPlacesDescription: {
        color: color.text
    }
};

export default styles;
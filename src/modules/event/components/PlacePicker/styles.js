import { StyleSheet } from 'react-native';

import * as theme from '../../../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, lineHeight } = theme;

const styles = StyleSheet.create({
    markerContainer:{
        position: 'absolute',
        flex: 1,
        top: 0,
        bottom: 0,
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
        height: 50,
        flexGrow: 0,
        flexShrink: 0
    },
    textInputContainer: {
        width: '100%',
        backgroundColor: color.white,
        borderTopWidth: 0,
        borderBottomWidth:0
    },
    listView: {
        position: 'absolute',
        top: 42,
        // left: 10,
        // right: 10,
        backgroundColor: color.white,
        // borderRadius: 5,
        flex: 1,
        // elevation: 3,
        zIndex: 10
    },
    description: {
        color: color.black
    },
    predefinedPlacesDescription: {
        color: color.black
    }
};

export default styles;
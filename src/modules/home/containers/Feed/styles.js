import {StyleSheet} from 'react-native';
import * as theme from "../../../../styles/theme";

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
        container: {
            backgroundColor: color.background,
            flex: 1,
        },
        searchIconContainer: {
            paddingHorizontal: padding.horizontal,
            marginRight: -padding.horizontal
        },
        emptyContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        emptyText: {
            color: color.text,
            fontSize: fontSize.large,
            opacity: 0.75
        },
        headerWrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        }
    }
);

export default styles;

import {StyleSheet} from 'react-native';
import * as theme from "../../../../styles/theme";

const {padding, color, fontSize, fontFamily, windowWidth, normalize} = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
        container: {
            backgroundColor: color.background,
            flex: 1,
        },
        titleContainer: {
            marginHorizontal: padding.horizontal * 2.5,
            flexShrink: 1,
        },

        titleText: {
            fontSize: fontSize.header,
            fontFamily: fontFamily.bold,
            color: color.text,
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

import {Dimensions, Platform} from 'react-native';
import {moderateScale as normalize} from 'react-native-size-matters';

const color = {
    main: '#ED8F5B',
    secondary: '#E36D60',
    accent_light: '#9C4368',
    accent: '#33223B',
    accent_dark: '#211E2B',
    background: 'white',
    black: "#3B3031",
    light_black: "#414141",
    white: "#ffffff",
    light_grey: "#eaeaea",
    grey: "#ccc",
    red: "red",
    underlayColor: "#ddd",
    tab_active: '#E36D60',
    tab_inactive: '#ED8F5B',
};

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(21),
    header: normalize(27),
};

const fontFamily = {
    extrabold: "RobotoExtraBold",
    bold: "RobotoBold",
    medium: "RobotoMedium",
    regular: "RobotoRegular",
    light: "RobotoLight"
};

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const lineHeight = {
    paragraph: 15,
};

const tabColor = (Platform.OS === "ios") ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
const selectedTabColor = (Platform.OS === "ios") ? "rgb(73,75,76)" : "#fff";

const tabIconStyle = {size: 21, color: tabColor, selected: selectedTabColor};
const navTitleStyle = {fontSize: fontSize.regular, fontFamily: fontFamily.extrabold, color: color.black};

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    lineHeight,
    normalize
}
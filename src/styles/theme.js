import {Dimensions, Platform} from 'react-native';
import {moderateScale as normalize} from 'react-native-size-matters';

const color = {
    main: '#FF3320',
    secondary: '#E36D60',
    accent_light: '#9C4368',
    accent: '#33223B',
    accent_dark: '#211E2B',
    background: '#352F3D',
    black: "#3B3031",
    light_black: "#414141",
    white: "#ffffff",
    light_grey: "#ccc",
    grey: "#888",
    dark_grey: '#555',
    red: "red",
    underlayColor: "#ddd",


    // tab_active: '#3B3031',
    // tab_inactive: '#bbb',
    tab_active: 'white',
    tab_inactive: '#ccc',

    //6am-12pm
    morning: '#EE8F55',
    // morning: '#73CCDE',
    // morning: '#DE873D',
    morning_gradient1: '#ff9966',
    morning_gradient2: '#ff5e62',

    //12pm-6pm

    // afternoon: '#E96A61',
    afternoon: '#E95961',
    afternoon_gradient1: '#da4453',
    afternoon_gradient2: '#89216b',

    //6pm-12am
    // night: '#AC6C82',
    // night: '#734D6C',
    // night: '#6F50B5',
    night: '#964772',
    night_gradient2: '#c06c84',
    night_gradient1: '#6c5b7b',
    night_gradient3: '#355c7d',

    //12am-6am
    latenight: '#594091',
    latenight_gradient1: '#5C3A7F',
    latenight_gradient2: '#2f0743',


    text: 'white'

};

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(18),
    xlarge: normalize(21),
    header: normalize(27),
};

const fontFamily = {
    extrabold: "IBMExtraBold",
    bold: "IBMBold",
    medium: "IBMMedium",
    regular: "IBMRegular",
    light: "IBMLight",
};

const padding = {
    horizontal: 10,
    vertical: 10,
};

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
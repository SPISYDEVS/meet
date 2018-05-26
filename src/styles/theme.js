import {Dimensions, Platform} from 'react-native';
import {moderateScale as normalize} from 'react-native-size-matters';

const color = {
    // main: '#FF3320',
    // secondary: '#E36D60',
    // accent_light: '#9C4368',
    // accent: '#33223B',
    // accent_dark: '#211E2B',
    // background: '#352F3D',
    background: '#2d2833',
    black: "#3B3031",
    light_black: "#414141",
    white: "#ffffff",
    light_grey: "#ccc",
    grey: "#888",
    dark_grey: '#555',
    red: "red",
    underlayColor: "#ddd",

    welcome_gradient1: '#FF8B43',
    welcome_gradient2: '#EF8550',
    welcome_gradient3: '#D57F5C',
    welcome_gradient4: '#C86B62',
    welcome_gradient5: '#B76069',
    welcome_gradient6: '#AE5B6D',
    welcome_gradient7: '#964772',


    // tab_active: '#3B3031',
    // tab_inactive: '#bbb',
    tab_active: 'white',
    tab_inactive: '#ccc',

    //6am-12pm
    morning: '#FF8B43',
    morning_card_gradient1: '#EE8F55',
    morning_card_gradient2: '#FF8B43',
    // morning: '#73CCDE',
    // morning: '#DE873D',
    morning_gradient1: '#ffae43',
    morning_gradient2: '#f86934',

    //12pm-6pm

    // afternoon: '#E96A61',
    afternoon: '#E95961',
    afternoon_card_gradient1: '#E95961',
    afternoon_card_gradient2: '#E95961',
    afternoon_gradient1: '#d45858',
    afternoon_gradient2: '#a71c78',

    //6pm-12am
    // night: '#AC6C82',
    // night: '#734D6C',
    // night: '#6F50B5',
    night: '#964772',
    night_card_gradient1: '#B14e84',
    night_card_gradient2: '#964772',
    night_gradient1: '#964772',
    night_gradient2: '#432c58',
    night_gradient3: '#355c7d',

    //12am-6am
    latenight: '#594091',
    latenight_card_gradient1: '#594091',
    latenight_card_gradient2: '#594091',
    latenight_gradient1: '#5C3A7F',
    latenight_gradient2: '#2f0743',


    text: 'white',
    transparent: 'transparent'

};

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    medium: normalize(15),
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
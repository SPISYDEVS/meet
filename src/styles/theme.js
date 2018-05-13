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

    //12pm-6pm
    afternoon: '#E96A61',

    //6pm-12am
    night: '#AC6C82',

    //12am-6am
    latenight: '#455C7B',

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
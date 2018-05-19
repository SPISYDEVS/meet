import {color} from "../../../styles/theme";
import moment from "moment";
import {MORNING_START, AFTERNOON_START, NIGHT_START, LATENIGHT_START} from "../../../config/constants";

export const isBetweenTime = (time, startTime, endTime) => {
    let startHour = moment(startTime, 'HH:mm').hours();
    let endHour = moment(endTime, 'HH:mm').hours();

    if (startHour > endHour) {
        endHour += 24;
    }

    const timeHours = moment(time).hours();

    return startHour <= timeHours && timeHours < endHour;
};

export const fetchBackgroundColor = (date) => {
    if (isBetweenTime(date, MORNING_START, AFTERNOON_START)) {
        return color.morning;
    }
    if (isBetweenTime(date, AFTERNOON_START, NIGHT_START)) {
        return color.afternoon;
    }
    if (isBetweenTime(date, NIGHT_START, LATENIGHT_START)) {
        return color.night;
    }

    return color.latenight;
};

export const fetchBackgroundGradient = (date) => {
    if (isBetweenTime(date, MORNING_START, AFTERNOON_START)) {
        return [color.morning_gradient1, color.morning_gradient2];
    }
    if (isBetweenTime(date, AFTERNOON_START, NIGHT_START)) {
        return [color.afternoon_gradient1, color.afternoon_gradient2];
    }
    if (isBetweenTime(date, NIGHT_START, LATENIGHT_START)) {
        return [color.night_gradient2, color.night_gradient1];
    }

    return [color.latenight_gradient1, color.latenight_gradient2];
};
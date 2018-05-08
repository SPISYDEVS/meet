import {DATE_FORMAT} from '../../../config/constants';
import moment from "moment";

export const momentFromDate = (date) => {
    return moment(date, DATE_FORMAT);
};
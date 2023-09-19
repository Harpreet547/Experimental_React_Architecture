import moment from "moment";
import DateTime from "./DateTime";
import { IDateTime } from "./IDateOnly";

const isDate = (dateStr: string) => {
    const date = moment(dateStr/* , moment.RFC_2822 */);
    return date.isValid();
};

const parseDate = (dateStr: string) => {
    if(!isDate(dateStr)) return;

    const date = moment(dateStr/* , moment.RFC_2822 */);
    const JSDate = date.toDate();

    return DateTime.fromDate(JSDate);
};

const toDateAndMonth = (dateTime: IDateTime): string => {
    const date = DateTime.toMomentDate(dateTime);

    return date.format('DD MMM');
};

const toTime = (dateTime: IDateTime): string => {
    const date = DateTime.toMomentDate(dateTime);

    return date.format('hh:mmA');
};

const diff = (first: IDateTime, second: IDateTime): string => {
    const mFirst = DateTime.toMomentDate(first);
    const mSecond = DateTime.toMomentDate(second);

    let minutes = mFirst.diff(mSecond, 'minutes');

    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);

    let returnVal = '';

    if(days) returnVal += `${days}d : `;
    if(days || hours) returnVal += `${hours}h : `;
    if(minutes) returnVal += `${minutes}m`;

    return returnVal;
};

const DateTimeFormatter = {
    isDate,
    parseDate,
    toDateAndMonth,
    toTime,
    diff,
};
export default DateTimeFormatter;
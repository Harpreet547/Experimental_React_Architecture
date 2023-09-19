import moment, { Moment } from "moment";
import { IDateTime } from "./IDateOnly";

const fromDate = (date: Date): IDateTime => {
    return {
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),

        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    };
};

/**
 *  This method returns date in UTC
 * @param dateTime 
 * @returns Date in UTC
 */
const toDate = (dateTime: IDateTime): Date => {

    const date = moment();
    date.set({
        dates: dateTime.date,
        months: dateTime.month - 1,
        years: dateTime.year,

        hours: dateTime.hours,
        minutes: dateTime.minutes,
        seconds: dateTime.seconds,

    });

    return date.toDate();
};

const toMomentDate = (dateTime: IDateTime): Moment => {

    const date = moment();
    date.set({
        dates: dateTime.date,
        months: dateTime.month - 1,
        years: dateTime.year,

        hours: dateTime.hours,
        minutes: dateTime.minutes,
        seconds: dateTime.seconds,

    });

    return date;
};

const DateTime = {
    fromDate,
    toDate,
    /**
     * For internal CDH use only
     * @ignore
     */
    toMomentDate,
};
export default DateTime;
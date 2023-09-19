import moment from "moment";
import { IDateOnly } from "./IDateOnly";

const toDateOnly = (date: Date): IDateOnly => {
    return {
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
};

const toDate = (dateOnly: IDateOnly): Date => {
    const date = moment();
    date.set({
        dates: dateOnly.date,
        months: dateOnly.month - 1,
        years: dateOnly.year,
    });

    return date.toDate();
};

const DateOnly = {
    toDateOnly,
    toDate,
};

export default DateOnly;
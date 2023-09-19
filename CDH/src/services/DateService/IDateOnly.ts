
export interface IDateOnly {
    date: number;
    month: number;
    year: number;
}

export interface IDateTime extends IDateOnly {
    hours: number;
    minutes: number;
    seconds: number;
}
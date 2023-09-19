import DateTimeFormatter from "../DateService/DateTimeFormatter";
import { IRequestData } from "./NetworkServiceTypes";
import axios from 'axios';

const qaURL = 'https://cruds-p3s-qa.azurewebsites.net/api';
const qaKey = 'code=TIuEqnhxirXoIQ3rITXqJ4iKsf-RrLyCfqwbhwij8a_AAzFufYkhsQ==';

const apiURL = 'https://cruds-p3s-dev.azurewebsites.net/api';
const apiKey = 'code=CGrlX4qhwqrDKR2_2MW1f4wh2jZDssC_sPJRZIkvD0ldAzFuqvlVmw==';

const URL = qaURL;
const key = qaKey;

const reviver = (key: string, value: unknown) => {

    if (typeof value === 'string' && value.includes('+') && value.includes(':') && value.includes('T') && DateTimeFormatter.isDate(value)) {
        const date = DateTimeFormatter.parseDate(value);
        return date;
    }
    return value;
};

const get = async <T>(settings: IRequestData) => {
    const res = await axios.get<T>(URL + '/' + settings.method + '?' + key);

    return res.data;
};

const post = async <T>(settings: IRequestData) => {
    const res = await axios.post<T>(URL + '/' + settings.method + '?' + key, settings.data, {
        transformResponse: (res) => {
            return res && typeof res === 'string' ? JSON.parse(res, reviver) as T : undefined;
        },
        responseType: 'json'
    });

    return res.data;
};

const execute = <T>(settings: IRequestData) => {
    if (settings.type === 'GET') {
        return get<T>(settings);
    } else if (settings.type === 'POST') {
        return post<T>(settings);
    }
};

const NetworkService = {
    execute
};
export default NetworkService;
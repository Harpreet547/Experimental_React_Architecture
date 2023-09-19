import { IRequestData } from "../NetworkService/NetworkServiceTypes";
import { IError, loadState } from "../Types";

export interface IObjectFields {
    [key: string]: { value: unknown };
}

export interface IObject {
    id: string;
    requestData?: IRequestData;
    fields?: IObjectFields;
    loadState: loadState;
    error?: IError | null;
}

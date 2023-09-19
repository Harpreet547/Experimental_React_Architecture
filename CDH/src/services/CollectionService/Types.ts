import { IRequestData } from "../NetworkService/NetworkServiceTypes";
import { IError, loadState } from "../Types";

export enum IROWSTATE {
    ADDED = 1,
    DELETED = 2,
    EDITED = 3,
}
export type ICollectionRow<T = Record<string, unknown>> = T & {
    ROW_STATE?: IROWSTATE;
};

export interface ICollection<T = Record<string, unknown>> {
    id: string;
    requestData?: IRequestData;
    rows: ICollectionRow<T>[];
    loadState: loadState;
    error?: IError | null;
}

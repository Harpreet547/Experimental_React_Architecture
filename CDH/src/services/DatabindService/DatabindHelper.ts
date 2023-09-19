import { IObjectDatabind, IRowDatabind } from "./Types";

export const checkIfRowDatabind = (databind: IObjectDatabind | IRowDatabind) => {
    if((databind as IRowDatabind)['collectionID']) return true;
    else return false;
};
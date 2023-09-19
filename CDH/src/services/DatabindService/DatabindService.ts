import { Store } from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";
import ObjectService from "../ObjectService/ObjectService";
import { IObjectDatabind, IRowDatabind } from "./Types";
import CollectionService from "../CollectionService/CollectionService";

const transformObjectDatabind: <T>(databind: IObjectDatabind, state: RootState) => T = <T>(databind: IObjectDatabind, state: RootState) => {
    const fieldVal = ObjectService.getField(databind.objectID, databind.fieldName, state) as T;

    return fieldVal;
};

const updateObjectBoundValue = <T>(databind: IObjectDatabind, newValue: T, store: Store<RootState>) => {
    ObjectService.updateField(databind.objectID, databind.fieldName, newValue, store);
};

const transformRowDatabind = <T>(databind: IRowDatabind, state: RootState) => {
    const rows = CollectionService.get(databind.collectionID, state)?.rows;

    const row = rows?.[databind.index];

    return row?.[databind.fieldName] as T | undefined;
};

const updateRowBoundValue = <T>(databind: IRowDatabind, newValue: T, store: Store<RootState>) => {
    const rows = CollectionService.get(databind.collectionID, store.getState())?.rows;

    if(rows === undefined)
        throw('Collection bound to RowDatabind does not exist');

    const row = rows[databind.index];

    CollectionService.setRowAt(
        databind.collectionID, {
            ...row,
            [databind.fieldName]: newValue,
        },
        databind.index,
        store
    );
};

const DatabindService = {
    transformObjectDatabind,
    updateObjectBoundValue,
    transformRowDatabind,
    updateRowBoundValue,
};
export default DatabindService;
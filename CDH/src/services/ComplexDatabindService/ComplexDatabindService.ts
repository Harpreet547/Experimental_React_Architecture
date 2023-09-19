import { Store } from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";
import CollectionService from "../CollectionService/CollectionService";
import { IRowDatabind } from "../DatabindService/Types";
import { ICollectionRow } from "../CollectionService/Types";

const getComplexFieldValue = (fields: (string | number)[], row: unknown): unknown => {

    const [first, ...restFields] = fields;

    if(restFields.length > 0)
        return getComplexFieldValue(restFields, (row as (Record<string, unknown>))?.[first]);
    return (row as (Record<string, unknown>))?.[first];
};

const updateComplexFieldValue = (fields: (string | number)[], newValue: unknown, row: unknown) => {

    const [first, ...restFields] = fields;

    if(restFields.length > 0) {
        updateComplexFieldValue(restFields, newValue,(row as (Record<string, unknown>))?.[first]);
    } else {
        (row as Record<string, unknown>)[first] = newValue;
    }
};

const updateRowBoundValue = <T>(databind: IRowDatabind, newValue: T, store: Store<RootState>) => {
    const rows = CollectionService.get(databind.collectionID, store.getState())?.rows;

    const row = rows?.[databind.index];

    if(!row) return;

    const fieldQuery = databind.fieldName;
    const fields = fieldQuery.split('.').map(field => {
        if(isNaN(parseInt(field))) return field;
        else return parseInt(field);
    });

    // It should be fine to create deep copy using JSON.stringify and JSON.parse.
    // As, redux state should always be serializable
    const rowStr = JSON.stringify(row);
    const rowCopy = JSON.parse(rowStr) as ICollectionRow;

    updateComplexFieldValue(fields, newValue, rowCopy);

    CollectionService.setRowAt(
        databind.collectionID, {
            ...rowCopy
        },
        databind.index,
        store
    );
};

const transformRowDatabind = <T>(databind: IRowDatabind, state: RootState) => {
    const rows = CollectionService.get(databind.collectionID, state)?.rows;

    const row = rows?.[databind.index];

    if(!row) return;

    const fieldQuery = databind.fieldName;
    const fields = fieldQuery.split('.').map(field => {
        if(isNaN(parseInt(field))) return field;
        else return parseInt(field);
    });

    return getComplexFieldValue(fields, row) as T;
};

const ComplexDatabindService = {
    transformRowDatabind,
    updateRowBoundValue,
};
export default ComplexDatabindService;
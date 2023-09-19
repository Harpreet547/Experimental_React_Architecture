import { AnyAction, Store } from "@reduxjs/toolkit";
import { IObject, IObjectFields } from "./Types";
import { RootState } from "../../store/Store";
import {
    addObject,
    removeObject,
    setFieldsInObject,
    updateFieldInObject,
    setErrorInObject,
    setLoadStateInObject,
    setRequestDataInObject,
} from "../../store/slices/ObjectSlice";
import { IError, loadState } from "../Types";
import NetworkService from "../NetworkService/NetworkService";
import APIParserService from "../APIParserService/APIParserService";
import { IRequestData } from "../NetworkService/NetworkServiceTypes";

const doesExist = (id: string, state: RootState) => {
    const value = state.objects[id];

    return !!value;
};

const get = (id: string, state: RootState) => {
    const objects = state.objects;

    if (objects[id]) return objects[id];
    else return undefined;
};

const getField = (id: string, fieldName: string, state: RootState) => {
    const fields = state.objects[id]?.fields;

    return fields?.[fieldName]?.value;
};

const add = (object: IObject, store: Store<RootState, AnyAction>) => {

    store.dispatch(addObject(object));
};

const remove = (ids: [string], store: Store<RootState, AnyAction>) => {
    ids.forEach(id => {
        const exists = doesExist(id, store.getState());

        if (exists) store.dispatch(removeObject(id));
    });
};

const updateField = (id: string, fieldName: string, newValue: unknown, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists) throw new Error('Object does not exist in redux');

    store.dispatch(updateFieldInObject({ id, fieldName, newValue }));

};

const setFields = (id: string, fields: IObjectFields, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists) throw new Error('Object does not exist in redux');

    store.dispatch(setFieldsInObject({ id, fields }));
};

const setError = (id: string, error: IError | null, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists) throw new Error('Object does not exist in redux');

    store.dispatch(setErrorInObject({ id, error }));
};

const setLoadState = (id: string, loadState: loadState, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists) throw new Error('Object does not exist in redux');

    store.dispatch(setLoadStateInObject({ id, loadState }));
};

const getFieldsFromJSObject = (object: Record<string, unknown>): IObjectFields => {
    const fields: IObjectFields = {};
    for (const key in object) {
        fields[key] = { value: object[key] };
    }

    return fields;
};

const toJSObject = (id: string, state: RootState) => {
    const exists = doesExist(id, state);

    if (!exists)
        return null;

    const fields = get(id, state)?.fields;

    const obj: Record<string, unknown> = {};

    for (const key in fields) {
        obj[key] = fields[key].value;
    }
    return obj;
};

/**
 * Calls API and loads data is Object
 * Data should only be of type `Record<string, unkown>`
 * 
 * This functions never throws. All errors are cought and added to Object.error in redux
 * 
 * @param id Object id
 * @param store redux store
 * @returns Promise<Record<string, unknown> | undefined>
 */
const load = async (id: string, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists)
        throw new Error('Object does not exist');

    const object = get(id, store.getState());
    const requestData = object?.requestData;

    if (!requestData)
        throw new Error('Object does not exist');

    try {
        setLoadState(id, 'Loading', store);

        const data = await NetworkService.execute(requestData);
        const fields = getFieldsFromJSObject(APIParserService.getObject(data));

        setFields(id, fields, store);

        setLoadState(id, 'Loaded', store);

        setError(id, null, store);

    } catch (error) {
        setLoadState(id, 'Failed', store);

        setFields(id, {}, store);
        if (error instanceof Error)
            setError(id, {
                message: error.message,
                name: error.name,
                stack: error.stack
            }, store);
    }
};

const setRequestData = (id: string, requestData: IRequestData, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists)
        throw new Error('Object does not exist');

    store.dispatch(setRequestDataInObject({ id, requestData }));
};

const loadWithRequestData = async (id: string, requestData: IRequestData, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if (!exists)
        throw new Error('Object does not exist');

    setRequestData(id, requestData, store);

    return load(id, store);

};

const ObjectService = {
    doesExist,
    add,
    remove,
    get,
    updateField,
    setFields,
    getField,
    setLoadState,
    setError,
    getFieldsFromJSObject,
    load,
    setRequestData,
    loadWithRequestData,
    toJSObject,
};
export default ObjectService;
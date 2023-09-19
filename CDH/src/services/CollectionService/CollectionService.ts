import { AnyAction, Store } from "@reduxjs/toolkit";
import { ICollection, ICollectionRow } from "./Types";
import {
    addCollection,
    removeCollection,
    addRowInCollection,
    setRowsInCollection,
    addRowAtIndexInCollection,
    setRowAtIndexInCollection,
    setErrorInCollection,
    setLoadStateInCollection,
    setRequestDataInCollection,
} from "../../store/slices/CollectionSlice";
import { RootState } from "../../store/Store";
import { Actions } from "../../store/slices/Types";
import NetworkService from "../NetworkService/NetworkService";
import APIParserService from "../APIParserService/APIParserService";
import { IRequestData } from "../NetworkService/NetworkServiceTypes";
import { IError, loadState } from "../Types";

const get = <T = Record<string, unknown>>(id: string, state: RootState) => {
    const collections = state.collections;
    
    if(collections[id]) return collections[id] as ICollection<T>;
    else return undefined;
};

const doesExist = (id: string, state: RootState) => {
    const value = get(id, state);

    return !!value;
};

const add = (collection: ICollection, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(collection.id, store.getState());

    if(exists)
        throw new Error(`Collection ${collection.id} already exists`);

    store.dispatch<Actions<ICollection>>(addCollection(collection));
};

const remove = (ids: string[], store: Store<RootState, AnyAction>) => {
    ids.forEach((id) => {
        const value = get(id, store.getState());

        if(value)
            store.dispatch(removeCollection(id));

    });
};

const addRow = <T = Record<string, unknown>>(id: string, row: ICollectionRow<T>, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(addRowInCollection({id, row}));
};

const setRows = <T = Record<string, unknown>>(id: string, rows: ICollectionRow<T>[], store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(setRowsInCollection({ id, rows }));
};

const setRowAt = <T = Record<string, unknown>>(id: string, row: ICollectionRow<T>, index: number, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(setRowAtIndexInCollection({ id, index, row }));
};

const addRowAt = <T = Record<string, unknown>>(id: string, row: ICollectionRow<T>, index: number, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(addRowAtIndexInCollection({ id, index, row }));
};

const setLoadState = (id: string, loadState: loadState, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(setLoadStateInCollection({ id, loadState }));
};

const setError = (id: string, error: IError | null, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(setErrorInCollection({ id, error }));
};


/**
 * Calls API and loads data is collection
 * Data should only be of type `Record<string, unkown>`
 * 
 * This functions never throws. All errors are cought and added to Collection.error in redux
 * 
 * @param id collection id
 * @param store redux store
 * @returns Promise<ICollectionRow<T>[] | undefined>
 */
const load = async <T = Record<string, unknown>>(id: string, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    const collection = get(id, store.getState());
    const requestData = collection?.requestData;

    if(!requestData)
        throw new Error(`Collection ${id} does not exist`);
    
    try {
        setLoadState(id, 'Loading', store);

        const data = await NetworkService.execute(requestData);
        const rows = APIParserService.getRows<ICollectionRow<T>>(data); // Not converting rows into ICollectionRow[] as that is not needed yet.

        setRows<T>(id, rows, store);

        setLoadState(id, 'Loaded', store);
        setError(id, null, store);

        return rows;
    } catch(error) {
        setLoadState(id, 'Failed', store);

        setRows(id, [], store);

        if(error instanceof Error)
            setError(id, {
                message: error.message,
                name: error.name,
                stack: error.stack
            }, store);
    }
};

const requestObject = (id: string, requestData: IRequestData, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    store.dispatch(setRequestDataInCollection({ id, requestData }));
};

const loadWithRequestData = async <T = Record<string, unknown>>(id: string, requestData: IRequestData, store: Store<RootState, AnyAction>) => {
    const exists = doesExist(id, store.getState());

    if(!exists)
        throw new Error(`Collection ${id} does not exist`);

    requestObject(id, requestData, store);

    return load<T>(id, store);

};

const CollectionService = {
    doesExist,
    get,
    add,
    remove,
    addRow,
    setRows,
    setRowAt,
    addRowAt,
    load,
    loadWithRequestData,
    setLoadState,
    setError,
    requestObject,
};
export default CollectionService;
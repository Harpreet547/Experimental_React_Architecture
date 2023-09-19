import { createSlice } from "@reduxjs/toolkit";
import { Actions } from "./Types";
import { ICollection, ICollectionRow } from "../../services/CollectionService/Types";
import { IError, loadState } from "../../services/Types";
import { IRequestData } from "../../services/NetworkService/NetworkServiceTypes";

export interface ICollectionState {
    [key: string]: ICollection;
}

const initialState: ICollectionState = {};

export const CollectionSlice = createSlice({
    name: 'Collections',
    initialState,
    reducers: {
        addCollection: (state, action: Actions<ICollection>) => {
            state[action.payload.id] = { ...action.payload };
        },
        removeCollection: (state, action: Actions<string>) => {
            delete state[action.payload];
        },
        addRowInCollection: (state, action: Actions<{ id: string; row: ICollectionRow }>) => {
            state[action.payload.id].rows = [...state[action.payload.id].rows, action.payload.row];
        },
        setRowsInCollection: (state, action: Actions<{ id: string; rows: ICollectionRow[] }>) => {
            state[action.payload.id].rows = action.payload.rows;
        },
        addRowAtIndexInCollection: (state, action: Actions<{ id: string; row: ICollectionRow; index: number }>) => {
            state[action.payload.id].rows.splice(action.payload.index, 0, action.payload.row);
        },
        setRowAtIndexInCollection: (state, action: Actions<{ id: string; row: ICollectionRow; index: number }>) => {
            state[action.payload.id].rows.splice(action.payload.index, 1, action.payload.row);
        },
        setErrorInCollection: (state, action: Actions<{ id: string; error: IError | null }>) => {
            state[action.payload.id].error = action.payload.error;
        },
        setLoadStateInCollection: (state, action: Actions<{id: string; loadState: loadState }>) =>{
            state[action.payload.id].loadState = action.payload.loadState;
        },
        setRequestDataInCollection: (state, action: Actions<{ id: string; requestData: IRequestData }>) => {
            state[action.payload.id].requestData = action.payload.requestData;
        },
    }
});

export const {
    addCollection,
    removeCollection,
    addRowInCollection,
    setRowsInCollection,
    addRowAtIndexInCollection,
    setRowAtIndexInCollection,
    setErrorInCollection,
    setLoadStateInCollection,
    setRequestDataInCollection,
} = CollectionSlice.actions;
export default CollectionSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { Actions } from "./Types";
import { IObject, IObjectFields } from "../../services/ObjectService/Types";
import { IError, loadState } from "../../services/Types";
import { IRequestData } from "../../services/NetworkService/NetworkServiceTypes";

export interface IObjectState {
    [key: string]: IObject;
}

const initialState: IObjectState = {};

export const ObjectSlice = createSlice({
    name: 'Objects',
    initialState,
    reducers: {
        addObject: (state, action: Actions<IObject>) => {
            state[action.payload.id] = action.payload;
        },
        removeObject: (state, action: Actions<string>) => {
            delete state[action.payload];
        },
        updateFieldInObject: (state, action: Actions<{ id: string; fieldName: string; newValue: unknown }>) => {
            state[action.payload.id].fields = {
                ...state[action.payload.id].fields,
                [action.payload.fieldName]: { value: action.payload.newValue },
            };
        },
        setFieldsInObject: (state, action: Actions<{ id: string; fields: IObjectFields }>) => {
            state[action.payload.id].fields = action.payload.fields;
        },
        setErrorInObject: (state, action: Actions<{ id: string; error: IError | null }>) => {
            state[action.payload.id].error = action.payload.error;
        },
        setLoadStateInObject: (state, action: Actions<{ id: string; loadState: loadState}>) => {
            state[action.payload.id].loadState = action.payload.loadState;
        },
        setRequestDataInObject: (state, action: Actions<{ id: string; requestData: IRequestData }>) => {
            state[action.payload.id].requestData = action.payload.requestData;
        },
    },
});

export const {
    addObject,
    removeObject,
    setFieldsInObject,
    updateFieldInObject,
    setErrorInObject,
    setLoadStateInObject,
    setRequestDataInObject,
} = ObjectSlice.actions;
export default ObjectSlice.reducer;
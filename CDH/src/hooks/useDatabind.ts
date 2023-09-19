import { shallowEqual, useSelector, useStore } from "react-redux";
import { RootState } from "../store/Store";
import DatabindService from "../services/DatabindService/DatabindService";
import { IObjectDatabind, IRowDatabind } from "../services/DatabindService/Types";
import { useCallback } from "react";
import { checkIfRowDatabind } from "../services/DatabindService/DatabindHelper";
import ComplexDatabindService from "../services/ComplexDatabindService/ComplexDatabindService";

export const useObjectDatabind: <T = unknown>(databind?: IObjectDatabind) => {
    boundValue: T | undefined;
    updateBoundValue: <T>(newValue: T) => void;
} = <T>(databind?: IObjectDatabind) => {

    const store = useStore<RootState>();

    const boundValue: T | undefined = useSelector((state: RootState) => {
        return databind ? DatabindService.transformObjectDatabind<T>(databind, state) : undefined;
    }, shallowEqual); // Safeguard as current field value is unkown that means it can be an object too. Will check if we should update type

    const updateBoundValue: <T>(newValue: T) => void = useCallback(<T>(newValue: T) => {
        if(!databind) return;

        DatabindService.updateObjectBoundValue(databind, newValue, store);
    }, [databind, store]);

    return {
        boundValue,
        updateBoundValue,
    };
};

export const useRowDatabind: <T = unknown>(databind?: IRowDatabind) => {
    boundValue: T | undefined;
    updateBoundValue: (newValue: T) => void;
} = <T = unknown>(databind?: IRowDatabind) => {
    const store = useStore<RootState>();

    const isComplexDatabind = databind?.fieldName.includes('.') ?? false;

    const boundValue: T | undefined = useSelector((state: RootState) => {
        if(isComplexDatabind) {
            return databind ? ComplexDatabindService.transformRowDatabind(databind, state) : undefined;
        } else {
            return databind ? DatabindService.transformRowDatabind<T>(databind, state) : undefined;
        }
    }, shallowEqual); // Safeguard as current field value is unkown that means it can be an object too. Will check if we should update type

    const updateBoundValue: (newValue: T) => void = useCallback((newValue: T) => {
        if(!databind) return;

        if(isComplexDatabind)
            ComplexDatabindService.updateRowBoundValue(databind, newValue, store);
        else
            DatabindService.updateRowBoundValue(databind, newValue, store);
    }, [databind, isComplexDatabind, store]);

    return {
        boundValue,
        updateBoundValue,
    };
};

export const useDatabind = <T>(databind: IObjectDatabind | IRowDatabind | undefined) => {
    const isRowDatabind = databind && checkIfRowDatabind(databind);

    const {
        boundValue: objectBoundValue,
        updateBoundValue: updateObjectBoundValue,
    } = useObjectDatabind<T>(isRowDatabind ? undefined : (databind as IObjectDatabind));

    const {
        boundValue: rowBoundValue,
        updateBoundValue: updateRowBoundValue,
    } = useRowDatabind<T>(isRowDatabind ? (databind as IRowDatabind) : undefined);

    return {
        boundValue: isRowDatabind ? rowBoundValue : objectBoundValue,
        updateBoundValue: isRowDatabind ? updateRowBoundValue : updateObjectBoundValue,
    };
};
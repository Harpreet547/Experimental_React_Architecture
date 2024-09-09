import { useEffect } from "react";
import { IObject, IObjectFields } from "../services/ObjectService/Types";
import { useStore } from "react-redux";
import ObjectService from "../services/ObjectService/ObjectService";
import { RootState } from "../store/Store";
import { loadState } from "../services/Types";


export type objectLoadHandler = (
    id: string,
) => Promise<IObjectFields>;

const useObject = (
    id: IObject['id'],
    requestData: IObject['requestData'] | objectLoadHandler | undefined,
    declare: boolean,
    autoLoad: boolean,
    fields?: IObject['fields'],
    loadState?: loadState,
): void => {

    const store = useStore<RootState>();

    useEffect(() => {
        if (!declare) return;

        if (ObjectService.doesExist(id, store.getState())) return;

        ObjectService.add({
            id,
            fields,
            requestData: typeof requestData !== 'function' ? requestData : undefined,
            loadState: loadState ?? 'NotLoaded'
        }, store);
    }, [id, fields, requestData, store, declare, loadState]);

    useEffect(() => {
        // Autoload
        if (!autoLoad) return;

        const object = ObjectService.get(id, store.getState());

        if (
            !object ||
            object?.loadState === 'Failed' ||
            object?.loadState === 'Loading' ||
            object?.loadState === 'Loaded'
        ) return;

        void ObjectService.load(id, store);

    }, [id, store, autoLoad]);

    useEffect(() => {
        if (
            typeof requestData !== 'function' ||
            !autoLoad ||
            ObjectService.get(id, store.getState())?.loadState !== 'NotLoaded'
        )
            return;

        ObjectService.setLoadState(id, 'Loading', store);
        requestData?.(id)
            .then((fields: IObjectFields) => {
                ObjectService.setFields(id, fields, store);
                ObjectService.setLoadState(id, 'Loaded', store);
            })
            .catch((error: Error) => {
                ObjectService.setError(id, error, store);
                ObjectService.setLoadState(id, 'Failed', store);
            });
    }, [autoLoad, id, requestData, store]);
};
export default useObject;
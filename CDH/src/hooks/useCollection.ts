import { useEffect } from "react";
import { RootState } from "../store/Store";
import { useStore } from "react-redux";
import { ICollection, ICollectionRow } from "../services/CollectionService/Types";
import CollectionService from "../services/CollectionService/CollectionService";
import { loadState } from "../services/Types";

export type listLoadHandler = (
    id: string,
) => Promise<ICollectionRow[]>;

const useCollection = <T>(
    collectionID: string,
    requestData: ICollection['requestData'] | listLoadHandler | undefined,
    declare: boolean,
    autoLoad: boolean,
    rows?: ICollectionRow<T>[],
    loadState?: loadState,
) => {

    const store = useStore<RootState>();

    useEffect(() => {
        if (!declare) return;

        if (CollectionService.doesExist(collectionID, store.getState())) return;

        CollectionService.add({
            id: collectionID,
            loadState: loadState ?? 'NotLoaded',
            rows: rows ?? [],
            requestData: typeof requestData !== 'function' ? requestData : undefined,
        }, store);
    }, [collectionID, rows, requestData, store, declare, loadState]);

    useEffect(() => {
        if (!autoLoad) return;

        const list = CollectionService.get(collectionID, store.getState());

        if (
            !list ||
            list?.loadState === 'Loaded' ||
            list?.loadState === 'Failed' ||
            list?.loadState === 'Loading' ||
            typeof requestData === 'function' ||
            list?.error
        ) return;

        // Autoload
        void CollectionService.load<T>(collectionID, store);
    }, [autoLoad, collectionID, requestData, store]);

    useEffect(() => {
        if (
            typeof requestData !== 'function' ||
            !autoLoad ||
            CollectionService.get(collectionID, store.getState())?.loadState !== 'NotLoaded'
        )
            return;

        CollectionService.setLoadState(collectionID, 'Loading', store);
        requestData?.(collectionID)
            .then((rows: ICollectionRow[]) => {
                CollectionService.setRows(collectionID, rows, store);
                CollectionService.setLoadState(collectionID, 'Loaded', store);
            })
            .catch((error: Error) => {
                CollectionService.setError(collectionID, error, store);
                CollectionService.setLoadState(collectionID, 'Failed', store);
            });
    }, [autoLoad, collectionID, requestData, store]);

};

export default useCollection;
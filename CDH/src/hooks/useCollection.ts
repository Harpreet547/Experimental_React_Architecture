import { useEffect } from "react";
import { RootState } from "../store/Store";
import { useStore } from "react-redux";
import { ICollection, ICollectionRow } from "../services/CollectionService/Types";
import CollectionService from "../services/CollectionService/CollectionService";
import { loadState } from "../services/Types";

const useCollection = <T>(
    collectionID: string,
    requestData: ICollection['requestData'] | undefined,
    declare: boolean,
    autoLoad: boolean,
    rows?: ICollectionRow<T>[],
    loadState?: loadState,
) => {

    const store = useStore<RootState>();

    useEffect(() => {
        if(!declare) return;

        if(CollectionService.doesExist(collectionID, store.getState())) return;

        CollectionService.add({
            id: collectionID,
            loadState: loadState ?? 'NotLoaded',
            rows: rows ?? [],
            requestData,
        }, store);
    }, [collectionID, rows, requestData, store, declare, loadState]);

    useEffect(() => {
        if(!autoLoad) return;

        const list = CollectionService.get(collectionID, store.getState());

        if(
            !list ||
            list?.loadState === 'Loaded' ||
            list?.loadState === 'Failed' ||
            list?.loadState === 'Loading' ||
            list?.error
        ) return;

        // Autoload
        void CollectionService.load<T>(collectionID, store);
    }, [autoLoad, collectionID, store]);

};

export default useCollection;
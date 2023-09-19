import { useEffect } from "react";
import { IObject } from "../services/ObjectService/Types";
import { useStore } from "react-redux";
import ObjectService from "../services/ObjectService/ObjectService";
import { RootState } from "../store/Store";
import { loadState } from "../services/Types";

const useObject = (
    id: IObject['id'],
    requestData: IObject['requestData'],
    declare: boolean,
    autoLoad: boolean,
    fields?: IObject['fields'],
    loadState?: loadState,
): void => {

    const store = useStore<RootState>();

    useEffect(() => {
        if(!declare) return;

        if(ObjectService.doesExist(id, store.getState())) return;

        ObjectService.add({
            id,
            fields,
            requestData,
            loadState: loadState ?? 'NotLoaded'
        }, store);
    }, [id, fields, requestData, store, declare, loadState]);

    useEffect(() => {
        // Autoload
        if(!autoLoad) return;

        const object = ObjectService.get(id, store.getState());

        if(
            !object ||
            object?.loadState === 'Failed' ||
            object?.loadState === 'Loading' ||
            object?.loadState === 'Loaded'
        ) return;

        void ObjectService.load(id, store);

    }, [id, store, autoLoad]);
};
export default useObject;
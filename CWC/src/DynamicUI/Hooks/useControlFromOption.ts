import { CollectionService, DynamicControlType, IOption, RootState, useCollection } from "@harpreet547/cdh";
import { useEffect, useId, useMemo } from "react";
import getRadioGroupFromOption from "./getRadioGroupFromOption";
import { useStore } from "react-redux";

const useControlFromOption = (option: IOption | undefined, collectionID: string, index: number, optionIndex: number) => {
    const { datasource, title, typeId } = option ?? {};
    const { values } = datasource ?? {};

    const DataSourceID = useId();
    const finalDataSourceID = datasource?.methodName ? datasource.methodName : (DataSourceID + DynamicControlType[typeId ?? DynamicControlType.CHECKBOX]);

    const store = useStore<RootState>();

    useCollection(
        finalDataSourceID,
        datasource?.methodName ? {
            method: datasource?.methodName,
            type: 'GET',
        } : undefined,
        !!datasource?.methodName || !!datasource?.values,
        !!datasource?.methodName,
        datasource?.values ?? undefined
    );

    useEffect(() => {
        if (CollectionService.doesExist(finalDataSourceID, store.getState()))
            CollectionService.setRows(finalDataSourceID, values ?? [], store);
    }, [finalDataSourceID, store, values]);

    const Control = useMemo(() => {
        if (!datasource) return null;

        switch (typeId) {
            case DynamicControlType.RADIOGROUP:
                return getRadioGroupFromOption(finalDataSourceID, datasource, title, collectionID, index, optionIndex);
            default:
                return null;
        }
    }, [collectionID, datasource, finalDataSourceID, index, optionIndex, title, typeId]);

    return Control;
};
export default useControlFromOption;
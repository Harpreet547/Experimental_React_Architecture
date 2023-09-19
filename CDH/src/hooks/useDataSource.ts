import { shallowEqual, useSelector } from "react-redux";
import { IKeyValueDataSource, IKeyValueElement, IRowDataSource } from "../services/DataSourceService/Types";
import { RootState } from "../store/Store";
import DataSourceService from "../services/DataSourceService/DataSourceService";
import { ICollectionRow } from "../services/CollectionService/Types";
import CollectionService from "../services/CollectionService/CollectionService";
import { useMemo } from "react";

const useDataSource: (
    type: 'RowDataSource' | 'KeyValueDataSource',
    dataSource?: IRowDataSource | IKeyValueDataSource
) => ICollectionRow[] | IKeyValueElement[] | undefined = (
    type: 'RowDataSource' | 'KeyValueDataSource',
    dataSource?: IRowDataSource | IKeyValueDataSource
) => {
    const rows = useSelector((state: RootState) => {
        if(!dataSource) return undefined;

        const collection = CollectionService.get(dataSource.collectionID, state);
        return collection?.rows;

    }, shallowEqual);

    const finalRows = useMemo(() => {
        return type === 'KeyValueDataSource' ? (
            DataSourceService.getKeyValueRows(rows, dataSource as IKeyValueDataSource)
        ) : (
            rows
        );
    }, [dataSource, rows, type]);

    return finalRows;
};

export default useDataSource;
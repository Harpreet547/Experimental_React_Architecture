import { RootState } from "../../store/Store";
import { IKeyValueDataSource, IKeyValueElement, IRowDataSource } from "./Types";
import CollectionService from "../CollectionService/CollectionService";
import { ICollectionRow } from "../CollectionService/Types";

const getKeyValueRows = (rows: Record<string, unknown>[] | undefined, dataSource: IKeyValueDataSource): IKeyValueElement[] | undefined => {
    return rows?.map(row => ({
        key: row[dataSource.keyField] as string,
        value: row[dataSource.valueField]
    }));
};

const transformKeyValueDataSource = (dataSource: IKeyValueDataSource, state: RootState): IKeyValueElement[] | undefined => {
    const collection = CollectionService.get(dataSource.collectionID, state);
    const rows = collection?.rows;

    return getKeyValueRows(rows, dataSource);
};

const transformRowDataSource = (dataSource: IRowDataSource, state: RootState): ICollectionRow[] | undefined => {
    const collection = CollectionService.get(dataSource.collectionID, state);
    const rows = collection?.rows;

    return rows;
};

const DataSourceService = {
    transformKeyValueDataSource,
    transformRowDataSource,
    getKeyValueRows,
};

export default DataSourceService;
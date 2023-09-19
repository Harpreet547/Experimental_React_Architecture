export interface IRowDataSource {
    collectionID: string;
}

export interface IKeyValueDataSource extends IRowDataSource {
    keyField: string;
    valueField: string;
}


export interface IKeyValueElement {
    key: string | number;
    value: unknown;
}
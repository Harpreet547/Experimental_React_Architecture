import { ICollectionRow, useCollection } from "@harpreet547/cdh";
import { ListControl, TextBox } from "@harpreet547/cwc";
import React, { useCallback } from "react";

interface IListResponse extends Record<string, unknown> {
    id?: number;
    value?: string;
}

const LISTVIEW_COLLECTIONID = "listview-demo";
const ListViewDemo: React.FC = (): React.ReactElement => {
    useCollection(LISTVIEW_COLLECTIONID, {
        method: 'list', // API method to fetch data
        type: 'GET', // Request type
    }, true, true)

    const onRenderListItem = useCallback((row: ICollectionRow<IListResponse>, index: number) => {
        return (
            <TextBox
                label={"Value: " + (row.id)}
                databind={{ collectionID: LISTVIEW_COLLECTIONID, fieldName: 'value', index }} // Databind for each row in DataSource, Collection id should be same as the collection id passed to ListControl.
            />
        );
    }, []);

    return (
        <>
            <h2>ListView Demo</h2>

            <ListControl
                datasource={{ collectionID: LISTVIEW_COLLECTIONID }}
                keyExtractor={(row: ICollectionRow<IListResponse>) => row.id as number}
                label="ListView"
                onRenderListItem={onRenderListItem}
            />
        </>
    );
};
export default ListViewDemo;
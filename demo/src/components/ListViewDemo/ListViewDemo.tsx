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
        method: 'list',
        type: 'GET',
    }, true, true)

    const onRenderListItem = useCallback((row: ICollectionRow<IListResponse>, index: number) => {
        return (
            <TextBox
                databind={{ collectionID: LISTVIEW_COLLECTIONID, fieldName: 'value', index }}
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
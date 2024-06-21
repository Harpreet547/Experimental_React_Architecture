import React from "react";
import { ObjectService, RootState, useCollection, useObject } from '@harpreet547/cdh';
import { Dropdown, TextBox } from '@harpreet547/cwc';
import { useSelector } from "react-redux";

const COLLECTIONID = "list-demo";
const DATABIND_OBJECTID = "list-databind-demo";
const ListDemo: React.FC = (): React.ReactElement => {
    useCollection(COLLECTIONID, undefined, true, false, [{
        id: 1,
        name: 'First',
    }, {
        id: 2,
        name: 'Second',
    }, {
        id: 3,
        name: 'Third',
    }]);

    useObject(DATABIND_OBJECTID, undefined, true, false, {
        selectedNameID: { value: null },
    });

    const selectedNameID = useSelector((state: RootState) => ObjectService.getField(DATABIND_OBJECTID, 'selectedNameID', state) as number | null);

    return (
        <>
            <h1>List Demo</h1>
            <Dropdown
                label="Names"
                dataSource={{ collectionID: COLLECTIONID, keyField: 'id', valueField: 'name' }}
                databind={{ objectID: DATABIND_OBJECTID, fieldName: 'selectedNameID' }}
            />
            {
                selectedNameID && (
                    <TextBox
                        label="Edit selected name"
                        databind={{ collectionID: COLLECTIONID, fieldName: 'name', index: selectedNameID - 1 }}
                    />
                )
            }
        </>
    );
};
export default ListDemo;
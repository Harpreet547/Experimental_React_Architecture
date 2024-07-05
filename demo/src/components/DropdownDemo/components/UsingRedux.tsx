import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CollectionService, ObjectService, RootState, useCollection, useObject } from '@harpreet547/cdh';
import { Dropdown } from '@harpreet547/cwc';

const COLLECTIONID = "list-demo-using-redux";
const FORMObjectID = "formid-using-redux";
const UsingRedux: React.FC = (): React.ReactElement => {
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

    useObject(FORMObjectID, undefined, true, false, {
        selectedNameID: { value: null },
    });

    const selectedDropdownValue = useSelector((state: RootState) => {
        const selectedValue = ObjectService.getField(FORMObjectID, 'selectedNameID', state) as number | null;
        const selectedRow = CollectionService.get(COLLECTIONID, state)?.rows.find(row => row.id === selectedValue);
        const selectedText = selectedRow?.name as string | undefined | null;

        return selectedValue ? {
            selectedValue,
            selectedText,
        } : undefined;
    }, shallowEqual);

    return (
        <>
            <h2>Using Redux</h2>
            <Dropdown
                label="Names"

                dataSource={{ collectionID: COLLECTIONID, keyField: 'id', valueField: 'name' }}
                databind={{ objectID: FORMObjectID, fieldName: 'selectedNameID' }}
            />

            {
                selectedDropdownValue && (
                    <>
                        <h3>Selected ID: {selectedDropdownValue.selectedValue}</h3>
                        <h3>Selected Value: {selectedDropdownValue.selectedText}</h3>
                    </>
                )
            }

        </>
    );
};
export default UsingRedux;
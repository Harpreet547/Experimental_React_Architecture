import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CollectionService, ObjectService, RootState, useCollection, useObject } from '@harpreet547/cdh';
import { Dropdown } from '@harpreet547/cwc';

const COLLECTIONID = "list-demo-using-redux";
const FORMObjectID = "formid-using-redux";
const UsingRedux: React.FC = (): React.ReactElement => {
    useCollection(
        COLLECTIONID, // ID against which this list will be stored in redux
        undefined, // Request settings to load data from API
        true, // declare, if this is true then list will be added to redux store
        false, // autoload, if this is true then list will be automatically loaded from API on component mount, loading can also be controlled with a variable or CollectionService
        [{ // We can pass hardcoded data to list if we are not loading it from API
            id: 1,
            name: 'First',
        }, {
            id: 2,
            name: 'Second',
        }, {
            id: 3,
            name: 'Third',
        }]
    );

    /**
     * To store selected dropdown value using databind.
     * We can use this to store data for entire form but here we only have one field.
     * This let's us aviod writting logic for storing and updating the selected value in component state and onChange.
     */
    useObject(
        FORMObjectID, // ID against which this object will be stored in redux
        undefined, // Request settings to load data from API
        true, // declare, if this is true then object/entity will be added to redux store
        false, // autoload, if this is true then object will be automatically loaded from API on component mount, loading can also be controlled with a variable or ObjectService
        { // We can pass hardcoded data to object if we are not loading it from API
            selectedNameID: { value: null },
        }
    );

    /**
     * Only logic inside this component is to get the selected dropdown value and text.
     */
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

                /**
                 * Using datasource let's us avoid writing logic to get the dropdown data from redux store.
                 */
                dataSource={{ collectionID: COLLECTIONID, keyField: 'id', valueField: 'name' }}
                /**
                 * Using databind let's us avoid writing logic to store the selected value in component state and onChange.
                 */
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
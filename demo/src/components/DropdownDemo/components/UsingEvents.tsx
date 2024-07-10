import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SelectionEvents, OptionOnSelectData } from '@fluentui/react-combobox';
import { RootState, useCollection } from '@harpreet547/cdh';
import { Dropdown } from '@harpreet547/cwc';

const COLLECTIONID = "list-demo";
const UsingEvents: React.FC = (): React.ReactElement => {
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
     * Get the datasource from redux store
     */
    const dropdownDataSource = useSelector((state: RootState) => state?.collections[COLLECTIONID]?.rows);

    /**
     * State to store selected dropdown value
     */
    const [selectedDropdownValue, setSelectedDropdownValue] = useState<number | undefined>(undefined);

    /**
     * Event handler for dropdown selection
     */
    const onChange = useCallback((_event: SelectionEvents, data: OptionOnSelectData) => {
        setSelectedDropdownValue(parseInt(data.optionValue as string));
    }, []);

    /**
     * Get the selected dropdown text
     */
    const selectedDropdownText = useMemo(() => {
        if (!selectedDropdownValue) return;

        const selectedRow = dropdownDataSource.find(row => row.id === selectedDropdownValue);
        return selectedRow?.name as string;
    }, [dropdownDataSource, selectedDropdownValue]);

    return (
        <>
            <h2>Using Event</h2>
            <Dropdown
                label="Names"

                /**
                 * Map and pass the dropdown datasource
                 * We could also do this in useSelector and pass the mapped data to Dropdown component
                 * But while mapping reference type data in selecter we'll have to use shallowEqual as useSelector use strict equality check by default
                 */
                options={dropdownDataSource?.map((row) => ({ value: `${row.id as number}`, text: row.name as string }))}
                onOptionSelect={onChange}
                selectedOptions={[`${selectedDropdownValue}`]}

            />

            {
                selectedDropdownValue && (
                    <>
                        <h3>Selected ID: {selectedDropdownValue}</h3>
                        <h3>Selected Value: {selectedDropdownText}</h3>
                    </>
                )
            }
        </>
    );
};
export default UsingEvents;
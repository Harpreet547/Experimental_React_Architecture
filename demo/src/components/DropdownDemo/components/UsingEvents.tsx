import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SelectionEvents, OptionOnSelectData } from '@fluentui/react-combobox';
import { RootState, useCollection } from '@harpreet547/cdh';
import { Dropdown } from '@harpreet547/cwc';

const COLLECTIONID = "list-demo";
const UsingEvents: React.FC = (): React.ReactElement => {
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

    const dropdownDataSource = useSelector((state: RootState) => state?.collections[COLLECTIONID]?.rows);

    const [selectedDropdownValue, setSelectedDropdownValue] = useState<number | undefined>(undefined);

    const onChange = useCallback((_event: SelectionEvents, data: OptionOnSelectData) => {
        setSelectedDropdownValue(parseInt(data.optionValue as string));
    }, []);

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
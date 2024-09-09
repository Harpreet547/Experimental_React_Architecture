import React from "react";
import { Spinner } from "@fluentui/react-components";
import { CollectionService, RootState, useCollection, useDatabind } from "@harpreet547/cdh";
import { RadioGroup, Switch } from "@harpreet547/cwc";
import { getProficiencies, getProficiencyIDForShortcut, getProficiencyTitle, ITag } from "../Data";
import { Growthbook_listID } from "../constants";
import { useSelector } from "react-redux";

interface IProficiencyDropdownProps {
    item: Record<string, unknown>;
    tag: ITag;
    isBulkMode?: boolean;
}
export const Proficiency_ListID = "proficiencies";
const ProficiencyDropdown: React.FC<IProficiencyDropdownProps> = (props: IProficiencyDropdownProps): React.ReactElement => {
    const { item, tag, isBulkMode } = props;

    const databind = { collectionID: Growthbook_listID, fieldName: `${tag.tagID}.value`, index: item.index as number };
    /**
     * If inbuilt databind is not sufficient, we can use useDatabind hook to create custom databind
     * Here we are using updateBoundValue to update the value of the databind on key press and default databind is handling radio onChange 
     */
    const { updateBoundValue, boundValue } = useDatabind(databind);

    useCollection(
        Proficiency_ListID,
        getProficiencies,
        true,
        true
    );

    const isLoading = useSelector((state: RootState) => {
        return CollectionService.get(Proficiency_ListID, state)?.loadState === 'Loading';
    });

    if (isLoading)
        return <Spinner />;

    /**
     * Dropdown has a bug and causing issues with Table
     * Using RadioGroup instead of Dropdown
     */
    return isBulkMode === true ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Switch
                databind={{ collectionID: Growthbook_listID, fieldName: `${tag.tagID}.isSelected`, index: item.index as number }}
            />
            {
                getProficiencyTitle(boundValue as number)
            }
        </div>
    ) : (
        <RadioGroup
            aria-label="Proficiency"
            dataSource={{ collectionID: Proficiency_ListID, keyField: 'proficiencyID', valueField: 'title' }}
            databind={databind}
            id={`${tag.tagID}_${item.index}`}
            key={`${tag.tagID}_${item.index}`}
            onKeyDown={(e) => {
                const id = getProficiencyIDForShortcut(e.key);
                if (id) {
                    updateBoundValue(id);
                }
            }}
        />
    );
};
export default ProficiencyDropdown;
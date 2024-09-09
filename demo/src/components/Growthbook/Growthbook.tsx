import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector, useStore } from "react-redux";
import { AnyAction } from "redux";
import { useCollection, RootState, CollectionService, useDatabind } from "@harpreet547/cdh";
import { Button, RadioGroup, Switch } from "@harpreet547/cwc";
import Table from "./Table/Table";
import { IColumnDefinition } from "./Table/Column";
import { getEntities, getProficiencies, getProficiencyIDForShortcut, getProficiencyTitle, getStudents, getTagsForEntity, ITag } from "./Data";

interface IGrowthBookTagValue {
    value: number | null;
    isSelected: boolean;
}

const Growthbook_listID = "growthbook";
const Tags_listID = "tags";
const Proficiency_ListID = "proficiencies";

const Growthbook: React.FC = (): React.ReactElement => {

    const [isBulkMode, setIsBulkMode] = useState(false);

    const store = useStore<RootState, AnyAction>();

    const getRows = useCallback(async () => {
        const students = await getStudents();
        const entities = await getEntities();
        const tags = (await Promise.all(entities.map(async (entity) => getTagsForEntity(entity.id as number)))).flat();
        const tagsForStudent: Record<string, unknown> = {};

        tags.forEach((tag) => {
            tagsForStudent[tag.tagID as string] = {
                value: null,
                isSelected: false,
            };
        });

        return students.map((student, index) => {
            return ({
                ...student,
                ...tagsForStudent,
                index
            });
        });
    }, []);

    useCollection(
        Growthbook_listID,
        getRows,
        true,
        true
    );

    const getTags = useCallback(async () => {
        const entities = await getEntities();
        const tags = (await Promise.all(entities.map(async (entity) => getTagsForEntity(entity.id as number)))).flat();

        return tags;
    }, []);

    useCollection(
        Tags_listID,
        getTags,
        true,
        true
    );

    useCollection(
        Proficiency_ListID,
        getProficiencies,
        true,
        true
    );

    const rows = useSelector((state: RootState) => {
        return CollectionService.get(Growthbook_listID, state)?.rows;
    }, shallowEqual);

    const tags = useSelector((state: RootState) => {
        return CollectionService.get(Tags_listID, state)?.rows as ITag[] | undefined;
    }, shallowEqual);

    const columnDefinitions = useMemo(() => {
        return getColumnDefinitions(tags, isBulkMode)
    }, [tags, isBulkMode]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const proficiencyID = getProficiencyIDForShortcut(e.key);

        if (!proficiencyID) return;

        const newRows = rows?.map((row) => {
            const newRow: Record<string, unknown> = { ...row };

            tags?.forEach((tag) => {
                newRow[tag.tagID as string] = {
                    value: (newRow[tag.tagID] as IGrowthBookTagValue).isSelected ? proficiencyID : (newRow[tag.tagID] as IGrowthBookTagValue).value,
                    isSelected: false,
                };
            });
            return {
                ...newRow,
            };
        });
        CollectionService.setRows(Growthbook_listID, newRows ?? [], store);
    }, [rows, store, tags]);

    useEffect(() => {

        if (isBulkMode) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, isBulkMode]);

    return (
        <>
            <h1>Growthbook</h1>
            <Button
                label={`Bulk Mode: ${isBulkMode ? 'On' : 'Off'}`}
                onClick={() => setIsBulkMode((old) => !old)}
                appearance="primary"
            />
            <Table
                columnDefinitions={columnDefinitions}
                rows={rows ?? []}
                getRowID={(item) => item.id as number}
            />
        </>
    );
};
export default Growthbook;

interface IProficiencyDropdownProps {
    item: Record<string, unknown>;
    tag: ITag;
    isBulkMode?: boolean;
}
const ProficiencyDropdown: React.FC<IProficiencyDropdownProps> = (props: IProficiencyDropdownProps): React.ReactElement => {
    const { item, tag, isBulkMode } = props;

    const databind = { collectionID: Growthbook_listID, fieldName: `${tag.tagID}.value`, index: item.index as number };
    const { updateBoundValue, boundValue } = useDatabind(databind);

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

const getColumnDefinitions = (tags: ITag[] | undefined, isBulkMode: boolean): IColumnDefinition[] => {
    const tagColumns: IColumnDefinition[] = tags?.map((tag) => ({
        columnId: tag.tagID,
        headerLabel: tag.name,
        fieldName: tag.tagID,
        renderCell: (item) => {
            return (
                <ProficiencyDropdown
                    item={item as Record<string, unknown>}
                    tag={tag}
                    key={tag.tagID + (item as Record<string, unknown>).index}
                    isBulkMode={isBulkMode}
                />
            );
        },
    })) ?? [];

    return [{
        columnId: 'studentName',
        headerLabel: 'Student Name',
        fieldName: 'studentName',
        renderCell: (item: unknown) => {
            return (
                <p>
                    {(item as Record<string, unknown>)?.studentName as string}
                </p>
            );
        },
    }, ...tagColumns];
};
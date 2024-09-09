import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector, useStore } from "react-redux";
import { AnyAction } from "redux";
import { Spinner } from "@fluentui/react-components";
import { useCollection, RootState, CollectionService } from "@harpreet547/cdh";
import { Button } from "@harpreet547/cwc";
import Table from "./Table/Table";
import { IColumnDefinition } from "./Table/Column";
import { getEntities, getProficiencyIDForShortcut, getStudents, getTagsForEntity, ITag } from "./Data";
import { Growthbook_listID, Tags_listID } from "./constants";
import ProficiencyDropdown from "./Components/ProficiencyDropdown";

interface IGrowthBookTagValue {
    value: number | null;
    isSelected: boolean;
}
const Growthbook: React.FC = (): React.ReactElement => {

    const [isBulkMode, setIsBulkMode] = useState(false);

    const store = useStore<RootState, AnyAction>();

    const getRows = useCallback(async () => {
        /**
         * Rows are built by combining students and tags
         * Here we are getting students, entities and tags from dummy functions but this can be multiple API calls replacing usage of saga
         */
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

    const rows = useSelector((state: RootState) => {
        return CollectionService.get(Growthbook_listID, state)?.rows;
    }, shallowEqual);

    const tags = useSelector((state: RootState) => {
        return CollectionService.get(Tags_listID, state)?.rows as ITag[] | undefined;
    }, shallowEqual);

    const isLoading = useSelector((state: RootState) => {
        const isRowsLoading = CollectionService.get(Growthbook_listID, state)?.loadState === 'Loading';
        const isTagsLoading = CollectionService.get(Tags_listID, state)?.loadState === 'Loading';

        return isRowsLoading || isTagsLoading;
    });

    const columnDefinitions = useMemo(() => {
        return getColumnDefinitions(tags, isBulkMode)
    }, [tags, isBulkMode]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const proficiencyID = getProficiencyIDForShortcut(e.key);

        if (!proficiencyID) return;

        const newRows = rows?.map((row) => {
            const newRow: Record<string, unknown> = { ...row };

            /**
             * Update the value of the tag with the selected proficiency
             * and set isSelected to false
             * 
             * For this example we are updating redux but we can get the selected tags and call API if needed
             * 
             */
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

        /**
         * If bulk mode is off then remove the event listener and use radio group's onKeyDown event
         */
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
            {
                isLoading ? (
                    <Spinner label='Loading' />
                ) : (
                    <>
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
                )
            }
        </>
    );
};
export default Growthbook;

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
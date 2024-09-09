import React, { useCallback, useEffect } from "react";
import { CollectionService, useCollection, RootState, useObject, ObjectService } from "@harpreet547/cdh";
import { useStore } from "react-redux";
import { Store, AnyAction } from "redux";
import { ListControl, TextBox } from "@harpreet547/cwc";
import { addDelay } from "../Utils";

interface IRowInterface extends Record<string, unknown> {
    id: number;
    name: string;
}
const COLLECTIONID = "saga-replacement";
const OBJECTID = "saga-replacement";
const SagaReplacement: React.FC = (): React.ReactElement => {

    const store: Store<RootState, AnyAction> = useStore();

    useCollection<IRowInterface>(
        COLLECTIONID,
        async () => {

            const rows1: IRowInterface[] = await addDelay<IRowInterface[]>([{
                id: 1,
                name: 'First',
            }, {
                id: 2,
                name: 'Second',
            }, {
                id: 3,
                name: 'Third',
            }], 2000);

            const rows2: IRowInterface[] = await addDelay<IRowInterface[]>([{
                id: 4,
                name: 'Fourth',
            }, {
                id: 5,
                name: 'Fifth',
            }, {
                id: 6,
                name: 'Sixth',
            }], 2000);

            return [...rows1, ...rows2];
        },
        true,
        true
    );

    useObject(
        OBJECTID,
        async () => {
            const fields1 = await addDelay<Record<string, unknown>>({
                name: 'Saga Replacement',
                id: 1,
            }, 2000);

            const fields2 = await addDelay<Record<string, unknown>>({
                date: {
                    month: 'January',
                    year: 2024,
                    day: 1,
                },
            }, 2000);

            return ObjectService.getFieldsFromJSObject({
                ...fields1,
                ...fields2,
            });
        },
        true,
        true
    );

    useEffect(() => {
        return () => {
            CollectionService.remove([COLLECTIONID], store);
        };
    }, [store]);

    const onRenderListItem = useCallback((row: Record<string, unknown>, index: number) => {
        return (
            <TextBox
                label={"Value: " + (row.id)}
                databind={{ collectionID: COLLECTIONID, fieldName: 'name', index }} // Databind for each row in DataSource, Collection id should be same as the collection id passed to ListControl.
            />
        );
    }, []);

    return (
        <>
            <h2>ListView Demo</h2>

            <ListControl
                datasource={{ collectionID: COLLECTIONID }}
                keyExtractor={(row) => row.id as number}
                label="ListView"
                onRenderListItem={onRenderListItem}
            />

            <hr />

            <h2>ObjectView Demo</h2>
            <TextBox
                label="Name"
                databind={{ objectID: OBJECTID, fieldName: 'name' }}
            />
            <TextBox
                label="ID"
                databind={{ objectID: OBJECTID, fieldName: 'id' }}
                type="number"
            />
        </>
    );
};
export default SagaReplacement;

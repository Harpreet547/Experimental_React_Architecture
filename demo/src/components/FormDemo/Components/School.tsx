import React, { useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import { CollectionService, RootState, useCollection } from "@harpreet547/cdh";
import { RadioGroup } from "@harpreet547/cwc";
import { addDelay } from "../../Utils";
import { Form_ObjectID } from "../constants";
import { useSelector, useStore } from "react-redux";

const getSchools = async (provinceID?: number) => {

    let schools = [{
        name: 'UoT',
        schoolID: 1
    }, {
        name: 'University of BC',
        schoolID: 2
    }, {
        name: 'University of Calgary',
        schoolID: 3
    }];

    if (provinceID === 1)
        schools = [{
            name: 'UoT',
            schoolID: 1
        }];

    if (provinceID === 2)
        schools = [{
            name: 'University of BC',
            schoolID: 2
        }];
    else if (provinceID === 3)
        schools = [{
            name: 'University of Calgary',
            schoolID: 3
        }];

    return addDelay(
        schools,
        2000
    );
};

interface ISchoolProps {
    provinceID?: number;
}
const Schools_ListID = 'schools'
const School: React.FC<ISchoolProps> = (props: ISchoolProps): React.ReactElement => {
    const { provinceID } = props;

    const store = useStore<RootState>();

    useCollection(
        Schools_ListID,
        undefined,
        true,
        true,
        []
    );

    const isLoading = useSelector((state: RootState) => {
        return CollectionService.get(Schools_ListID, state)?.loadState === 'Loading';
    });

    // Using just for example
    // Should not use useEffect for scenarios like these
    useEffect(() => {
        CollectionService.setLoadState(
            Schools_ListID,
            'Loading',
            store
        );
        getSchools(provinceID)
            .then((schools) => {
                CollectionService.setRows(
                    Schools_ListID,
                    schools,
                    store
                );
                CollectionService.setLoadState(
                    Schools_ListID,
                    'Loaded',
                    store
                );
            })
            .catch(error => {
                CollectionService.setError(
                    Schools_ListID,
                    error,
                    store
                );
                CollectionService.setLoadState(
                    Schools_ListID,
                    'Failed',
                    store
                );
            });
    }, [provinceID]);

    return isLoading ? (
        <Spinner
            label='Loading...'
        />
    ) : (
        <RadioGroup
            label="Schools"
            dataSource={{ collectionID: Schools_ListID, keyField: 'schoolID', valueField: 'name' }}
            databind={{ objectID: Form_ObjectID, fieldName: 'school' }}
        />
    );
};
export default School;
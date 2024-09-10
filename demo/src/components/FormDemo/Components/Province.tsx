import { useCollection } from "@harpreet547/cdh";
import { RadioGroup } from "@harpreet547/cwc";
import React from "react";
import { Form_ObjectID } from "../constants";

const Province_ListID = 'province';
const Province: React.FC = (): React.ReactElement => {

    useCollection(
        Province_ListID,
        undefined,
        true,
        false,
        [{
            name: 'Ontario',
            id: 1,
        }, {
            name: 'BC',
            id: 2
        }, {
            name: 'Alberta',
            id: 3
        }]
    );
    return (
        <RadioGroup
            label='Province'
            dataSource={{ collectionID: Province_ListID, keyField: 'id', valueField: 'name' }}
            databind={{ objectID: Form_ObjectID, fieldName: 'province' }}
        />
    );
};
export default Province;
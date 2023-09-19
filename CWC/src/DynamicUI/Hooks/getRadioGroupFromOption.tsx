import React from 'react';
import { DynamicControlTypeDataSource } from '@harpreet547/cdh';
import RadioGroup from '../../Controls/RadioGroup/RadioGroup';

const getRadioGroupFromOption = (
    finalDataSourceID: string,
    datasource: DynamicControlTypeDataSource,
    title: string | null | undefined,
    collectionID: string,
    index: number,
    optionIndex: number
) => {

    return (
        <RadioGroup
            databind={{ collectionID, index, fieldName: `options.${optionIndex}.answer` }}
            label={title ?? undefined}
            dataSource={
                (datasource.keyField && datasource.valueField) ? (
                    { collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }
                ) : undefined
            }
        />
    );
};
export default getRadioGroupFromOption;
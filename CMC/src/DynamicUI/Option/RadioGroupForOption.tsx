import React from 'react';
import { DynamicControlTypeDataSource, IObjectDatabind, IRowDatabind } from '@harpreet547/cdh';
import CardRadioGroup from '../../StyledControls/CardRadioGroup/CardRadioGroup';

// const getRadioGroupForOption = (
//     finalDataSourceID: string,
//     datasource: DynamicControlTypeDataSource,
//     title: string | null | undefined,
//     databind: IRowDatabind | IObjectDatabind | undefined,
// ) => {

//     if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic radio.');

//     return (
//         <CardRadioGroup
//             databind={databind}
//             label={title ?? undefined}
//             appearance='PRIMARY'
//             dataSource={{ collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }}
//         />
//     );
// };
// export default getRadioGroupForOption;

interface IRadioGroupForOptionProps {
    finalDataSourceID: string;
    datasource: DynamicControlTypeDataSource;
    title: string | null | undefined;
    databind: IRowDatabind | IObjectDatabind | undefined;
}
const RadioGroupForOption: React.FC<IRadioGroupForOptionProps> = (props: IRadioGroupForOptionProps): React.ReactElement => {
    const { databind, datasource, finalDataSourceID, title } = props;

    if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic radio.');

    return (
        <CardRadioGroup
            databind={databind}
            label={title ?? undefined}
            appearance='PRIMARY'
            dataSource={{ collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }}
        />
    );
};
export default RadioGroupForOption;
import React from 'react';
import { DynamicControlTypeDataSource, IObjectDatabind, IRowDatabind } from '@harpreet547/cdh';
import CardCheckboxGroup from '../../StyledControls/Checkbox/CardCheckboxGroup';

// const getCheckBoxGroupForOption = (
//     finalDataSourceID: string,
//     datasource: DynamicControlTypeDataSource,
//     title: string | null | undefined,
//     databind: IRowDatabind | IObjectDatabind | undefined,
// ) => {
//     if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic checkbox group.');

//     return (
//         <CardCheckboxGroup
//             databind={databind}
//             label={title ?? undefined}
//             dataSource={{ collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }}
//             appearance='PRIMARY'
//         />
//     );
// };
// export default getCheckBoxGroupForOption;

interface ICheckboxGroupForOptionProps {
    finalDataSourceID: string;
    datasource: DynamicControlTypeDataSource;
    title: string | null | undefined;
    databind: IRowDatabind | IObjectDatabind | undefined;
}
const CheckboxGroupForOption: React.FC<ICheckboxGroupForOptionProps> = (props: ICheckboxGroupForOptionProps): React.ReactElement => {
    const { databind, datasource, finalDataSourceID, title } = props;

    if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic checkbox group.');

    return (
        <CardCheckboxGroup
            databind={databind}
            label={title ?? undefined}
            dataSource={{ collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }}
            appearance='PRIMARY'
        />
    );
};
export default CheckboxGroupForOption;
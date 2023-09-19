import React from 'react';
import { DynamicControlTypeDataSource, IObjectDatabind, IRowDatabind } from '@harpreet547/cdh';
import CardDropdown from '../../StyledControls/Dropdown/CardDropdown';
import { IOptionSettings } from './Types';

// const getDropdownForOption = (
//     finalDataSourceID: string,
//     datasource: DynamicControlTypeDataSource,
//     title: string | null | undefined,
//     databind: IRowDatabind | IObjectDatabind | undefined,
//     settings?: IOptionSettings,
// ) => {
//     if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic checkbox group.');

//     return (
//         <CardDropdown
//             databind={databind}
//             label={title ?? undefined}
//             dataSource={{ collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }}
//             onPress={settings?.onChange}
//             value={settings?.value as string | number | undefined}
//             appearance='PRIMARY'
//         />
//     );
// };
// export default getDropdownForOption;

interface IDropdownForOptionProps {
    finalDataSourceID: string;
    datasource: DynamicControlTypeDataSource;
    title: string | null | undefined;
    databind: IRowDatabind | IObjectDatabind | undefined;
    settings?: IOptionSettings;
}
const DropdownForOption: React.FC<IDropdownForOptionProps> = (props: IDropdownForOptionProps): React.ReactElement => {
    const { databind, datasource, finalDataSourceID, title, settings } = props;

    if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic checkbox group.');

    return (
        <CardDropdown
            databind={databind}
            label={title ?? undefined}
            dataSource={{ collectionID: finalDataSourceID, keyField: datasource.keyField, valueField: datasource.valueField }}
            onPress={settings?.onChange}
            value={settings?.value as string | number | undefined}
            appearance='PRIMARY'
        />
    );
};
export default DropdownForOption;
import React from 'react';
import YesNoSwitch from '../../StyledControls/Switch/YesNoSwitch';
import { DynamicControlTypeDataSource, IObjectDatabind, IRowDatabind } from '@harpreet547/cdh';
import { IOptionSettings } from './Types';

// const getSwitchForOption = (
//     title: string | null | undefined,
//     databind: IRowDatabind | IObjectDatabind | undefined,
//     collectionID: string,
//     datasource: DynamicControlTypeDataSource,
//     settings?: IOptionSettings,
// ) => {
//     if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic checkbox group.');

//     return (
//         <YesNoSwitch
//             databind={databind}
//             label={title ?? undefined}
//             dataSource={{ collectionID: collectionID, keyField: datasource.keyField, valueField: datasource.valueField }}
//             onPress={settings?.onChange}
//             selectedVal={settings?.value as string | number | boolean | null | undefined}
//             appearance='PRIMARY'
//         />
//     );
// };
// export default getSwitchForOption;

interface ISwitchForOptionProps {
    title: string | null | undefined;
    databind: IRowDatabind | IObjectDatabind | undefined;
    collectionID: string;
    datasource: DynamicControlTypeDataSource;
    settings?: IOptionSettings;
}
const SwitchForOption: React.FC<ISwitchForOptionProps> = (props: ISwitchForOptionProps): React.ReactElement => {
    const { collectionID, databind, datasource, title, settings } = props;

    if (!datasource.keyField || !datasource.valueField) throw new Error('Missing keyField or valueField or both in dynamic checkbox group.');

    return (
        <YesNoSwitch
            databind={databind}
            label={title ?? undefined}
            dataSource={{ collectionID: collectionID, keyField: datasource.keyField, valueField: datasource.valueField }}
            onPress={settings?.onChange}
            selectedVal={settings?.value as string | number | boolean | null | undefined}
            appearance='PRIMARY'
        />
    );
};
export default SwitchForOption;
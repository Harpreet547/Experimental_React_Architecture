import { IObjectDatabind, IRowDatabind } from '@harpreet547/cdh';
import React from 'react';
import { IOptionSettings } from './Types';
import MultiSelectTextBox from '../../StyledControls/TextBox/MultiSelectTextBox';

// const getMultiSelectTextBoxForOption = (
//     title: string | null | undefined,
//     databind: IRowDatabind | IObjectDatabind | undefined,
//     settings?: IOptionSettings,
// ) => {
//     return (
//         <MultiSelectTextBox
//             databind={databind}
//             label={title ?? undefined}
//             appearance='PRIMARY'
//         />
//     );
// };

// export default getMultiSelectTextBoxForOption;

interface IMultiSelectTextBoxForOptionProps {
    title: string | null | undefined;
    databind: IRowDatabind | IObjectDatabind | undefined;
    settings?: IOptionSettings;
}
const MultiSelectTextBoxForOption: React.FC<IMultiSelectTextBoxForOptionProps> = (props: IMultiSelectTextBoxForOptionProps): React.ReactElement => {
    const { databind, title, settings } = props;

    return (
        <MultiSelectTextBox
            databind={databind}
            label={title ?? undefined}
            appearance='PRIMARY'
        />
    );
};
export default MultiSelectTextBoxForOption;
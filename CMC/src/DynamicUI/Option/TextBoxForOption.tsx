import React from 'react';
import CardTextBox from '../../StyledControls/TextBox/CardTextBox';
import { IObjectDatabind, IRowDatabind } from '@harpreet547/cdh';
import { IOptionSettings } from './Types';

// const getTextBoxForOption = (
//     title: string | null | undefined,
//     databind: IRowDatabind | IObjectDatabind | undefined,
//     settings?: IOptionSettings,
// ) => {

//     return (
//         <CardTextBox
//             databind={databind}
//             label={title ?? undefined}
//             onChangeText={settings?.onChange}
//             value={settings?.value as string | undefined}
//             appearance='PRIMARY'
//         />
//     );
// };
// export default getTextBoxForOption;

interface ITextBoxForOptionProps {
    title: string | null | undefined;
    databind: IRowDatabind | IObjectDatabind | undefined;
    settings?: IOptionSettings;
}
const TextBoxForOption: React.FC<ITextBoxForOptionProps> = (props: ITextBoxForOptionProps): React.ReactElement => {
    const { databind, title, settings } = props;

    return (
        <CardTextBox
            databind={databind}
            label={title ?? undefined}
            onChangeText={settings?.onChange}
            value={settings?.value as string | undefined}
            appearance='PRIMARY'
        />
    );
};
export default TextBoxForOption;
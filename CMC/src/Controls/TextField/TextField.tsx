import React from 'react';
import { View } from 'react-native';
import ControlLabel from '../Label/ControlLabel';
import { ControlTypes, IObjectDatabind, IRowDatabind, useDatabind } from '@harpreet547/cdh';
import Text from '../Text/Text';

interface ITextFieldProps extends ControlTypes.ILocalizedLabel {
    text?: string;
    textLocalizedID?: string;
    databind?: IRowDatabind | IObjectDatabind;
}
const TextField: React.FC<ITextFieldProps> = (props: ITextFieldProps): React.ReactElement => {
    const { label, labelLocalizedID, text, textLocalizedID, databind } = props;

    const { boundValue } = useDatabind(databind);
    const finalBoundValue = boundValue as string | undefined | null ?? text;
    const finalLocalizedID = boundValue ? undefined : textLocalizedID; // Bound value should always be localized

    return (
        <View>
            <ControlLabel
                label={label}
                labelLocalizedID={labelLocalizedID}
            />

            <Text
                label={finalBoundValue}
                labelLocalizedID={finalLocalizedID}
            />
        </View>
    );
};
export default TextField;
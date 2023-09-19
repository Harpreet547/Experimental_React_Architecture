import React, { useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { ControlTypes, useDatabind, IRowDatabind, IObjectDatabind } from '@harpreet547/cdh';
import { Input, InputProps } from '@rneui/base';
import ControlLabel from '../Label/ControlLabel';
import { makeStyles } from '@rneui/themed';

export interface ITextBoxProps extends Omit<InputProps, 'label' | 'labelProps' | 'labelStyle' | 'ref'>, ControlTypes.ILocalizedLabel {
    databind?: IRowDatabind | IObjectDatabind;
    textBoxRef?: React.RefObject<TextInput & Input>;
}
const TextBox: React.FC<ITextBoxProps> = (props: ITextBoxProps): React.ReactElement => {
    const { label, labelLocalizedID, databind, onChangeText, textBoxRef, value, ...inputProps } = props;

    const styles = useStyles();

    const { boundValue, updateBoundValue } = useDatabind(databind);
    const finalValue = boundValue as string | undefined ?? value;

    const onChange = useCallback((text: string) => {
        updateBoundValue(text);
        onChangeText?.(text);
    }, [onChangeText, updateBoundValue]);

    return (
        <View>
            {
                label &&
                <ControlLabel
                    label={label}
                    labelLocalizedID={labelLocalizedID}
                    style={styles.controlLabel}
                />
            }
            <Input
                {...inputProps}
                onChangeText={onChange}
                value={finalValue}
                inputStyle={styles.inputStyle}
                ref={textBoxRef}
            />
        </View>
    );
};
export default TextBox;

const useStyles = makeStyles((theme) => ({
    inputStyle: {
        color: theme.colors.text,
    },
    controlLabel: {
        marginLeft: theme.spacing.md
    }
}));
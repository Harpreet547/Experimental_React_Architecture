import React, { useCallback } from "react";
import { ControlTypes, IRowDatabind, IObjectDatabind, useDatabind } from "@harpreet547/cdh";
import { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import { CheckBox as NativeElementCheckbox, CheckBoxProps as NativeElementCheckboxProps } from '@rneui/base';
import { makeStyles, useTheme } from "@rneui/themed";

export interface ICheckboxProps extends Omit<NativeElementCheckboxProps, 'title' | 'checked' | 'children' | 'onPress'>, ControlTypes.ILocalizedLabel {
    databind?: IObjectDatabind | IRowDatabind;
    checked?: boolean;
    controlID?: string | number;
    onPress?: (event: GestureResponderEvent, checked?: boolean, controlID?: string | number) => void;
}
const CheckBox: React.FC<ICheckboxProps> = (props: ICheckboxProps): React.ReactElement => {
    const { label, labelLocalizedID, databind, onPress, checked, controlID, ...checkboxProps } = props;

    const styles = useStyles();
    const { theme } = useTheme();

    const { boundValue, updateBoundValue } = useDatabind(databind);

    const finalChecked = (boundValue as boolean | undefined | null ?? checked) ?? false;

    const onChange = useCallback((event: GestureResponderEvent) => {
        databind && updateBoundValue(!finalChecked);
        onPress?.(event, !finalChecked, controlID);
    }, [controlID, databind, finalChecked, onPress, updateBoundValue]);

    return (
        <NativeElementCheckbox
            {...checkboxProps}
            style={{
                ...(props.style as ViewStyle),
            }}
            textStyle={{
                ...styles.text,
                ...(props.textStyle as TextStyle),
            }}
            containerStyle={{
                ...styles.container,
                ...(props.containerStyle as ViewStyle),
            }}
            checkedColor={props.checkedColor ?? theme.colors.text}
            uncheckedColor={props.uncheckedColor ?? theme.colors.text}
            title={label}
            checked={finalChecked ?? false}
            onPress={onChange}
        />
    );
};
export default CheckBox;

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'transparent',
        margin: theme.spacing.sm,
        padding: 0,
    },
    text: {
        color: theme.colors.text,
    }
}));
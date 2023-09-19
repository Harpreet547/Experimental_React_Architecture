import React, { useCallback } from 'react';
import { GestureResponderEvent, StyleProp, View, ViewStyle } from 'react-native';
import { ControlTypes, IRowDatabind, IObjectDatabind, useDatabind, IKeyValueDataSource, useDataSource, IKeyValueElement } from '@harpreet547/cdh';
import ControlLabel from '../Label/ControlLabel';
import CheckBox, { ICheckboxProps } from '../CheckBox/CheckBox';
import { makeStyles } from '@rneui/themed';

export interface IRadioGroupProps extends ControlTypes.ILocalizedLabel {
    databind?: IRowDatabind | IObjectDatabind;
    options?: Omit<ICheckboxProps, 'onPress' | 'checked'>[];
    onPress?: (event: GestureResponderEvent, checked?: boolean | undefined, controlID?: string | number | undefined) => void;
    values?: number | string | null;
    dataSource?: IKeyValueDataSource;
    getRadioItemProps?: (isSelected?: boolean) => Omit<ICheckboxProps, 'onPress' | 'checked' | 'checkedIcon' | 'uncheckedIcon'>;
    radioGroupRootStyle?: StyleProp<ViewStyle>;
}
const RadioGroup: React.FC<IRadioGroupProps> = (props: IRadioGroupProps): React.ReactElement => {
    const { label, labelLocalizedID, databind, options, onPress, values, dataSource, getRadioItemProps, radioGroupRootStyle } = props;

    const styles = useStyles();

    const { boundValue, updateBoundValue } = useDatabind(databind);

    const finalBoundValue = boundValue as string | number | undefined ?? values;

    const dataSourceRows = useDataSource('KeyValueDataSource', dataSource) as IKeyValueElement[];

    const onChange = useCallback((event: GestureResponderEvent, checked?: boolean, controlID?: string | number) => {
        if (typeof controlID === 'number' || typeof controlID === 'string') {
            updateBoundValue(controlID);
        }

        onPress?.(event, checked, controlID);
    }, [onPress, updateBoundValue]);

    return (
        <View>
            <ControlLabel
                label={label}
                labelLocalizedID={labelLocalizedID}
                style={styles.controlLabel}
            />
            <View style={radioGroupRootStyle}>
                {
                    options && options.length > 0 ? (
                        options?.map((option, index) => (
                            <CheckBox
                                {...getRadioItemProps?.(finalBoundValue === (option.controlID ?? index))}
                                {...option}
                                key={option.controlID ?? index}
                                controlID={option.controlID ?? index}
                                checked={finalBoundValue === (option.controlID ?? index)}
                                onPress={onChange}
                                checkedIcon={option.checkedIcon ?? "dot-circle-o"}
                                uncheckedIcon={option.uncheckedIcon ?? "circle-o"}
                            />
                        ))
                    ) : (
                        dataSourceRows?.map((row) => (
                            <CheckBox
                                {...getRadioItemProps?.(finalBoundValue === row.key)}
                                key={row.key}
                                controlID={row.key}
                                checked={finalBoundValue === row.key}
                                label={row.value as string | null ?? undefined}
                                onPress={onChange}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        ))
                    )
                }
            </View>
        </View>
    );
};
export default RadioGroup;
const useStyles = makeStyles(theme => ({
    controlLabel: {
        marginLeft: theme.spacing.md
    }
}));
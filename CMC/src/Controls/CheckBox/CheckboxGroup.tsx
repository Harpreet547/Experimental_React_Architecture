import React, { useCallback } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { ControlTypes, IRowDatabind, IObjectDatabind, useDatabind, IKeyValueDataSource, useDataSource, IKeyValueElement } from '@harpreet547/cdh';
import ControlLabel from '../Label/ControlLabel';
import CheckBox, { ICheckboxProps } from './CheckBox';
import { makeStyles } from '@rneui/themed';

export interface ICheckboxGroupProps extends ControlTypes.ILocalizedLabel {
    databind?: IRowDatabind | IObjectDatabind;
    options?: Omit<ICheckboxProps, 'onPress' | 'checked'>[];
    onPress?: (event: GestureResponderEvent, checked?: boolean | undefined, constrolID?: string | number | undefined) => void;
    values?: (number | string)[];
    dataSource?: IKeyValueDataSource;
    getCheckboxItemProps?: (isChecked?: boolean) => Omit<ICheckboxProps, 'onPress' | 'checked'>;
}
const CheckboxGroup: React.FC<ICheckboxGroupProps> = (props: ICheckboxGroupProps): React.ReactElement => {
    const {
        label,
        labelLocalizedID,
        databind,
        options,
        onPress,
        values,
        dataSource,
        getCheckboxItemProps,
    } = props;

    const styles = useStyles();

    const { boundValue, updateBoundValue } = useDatabind(databind);

    const finalBoundValue = (boundValue as (string | number)[] | undefined ?? values);

    const dataSourceRows = useDataSource('KeyValueDataSource', dataSource) as IKeyValueElement[];

    const onChange = useCallback((event: GestureResponderEvent, checked?: boolean, controlID?: string | number) => {
        if (typeof controlID === 'number' || typeof controlID === 'string') {
            let value = [...(finalBoundValue ?? [])];
            const index = value.indexOf(controlID);
            if (index !== -1) {
                value.splice(index, 1);
            } else {
                value = [...value, controlID];
            }
            updateBoundValue(value);
        }

        onPress?.(event, checked, controlID);
    }, [finalBoundValue, onPress, updateBoundValue]);

    return (
        <View>
            <ControlLabel
                label={label}
                labelLocalizedID={labelLocalizedID}
                style={styles.controlLabel}
            />
            {
                options && options.length > 0 ? (
                    options?.map((option, index) => (
                        <CheckBox
                            {...getCheckboxItemProps?.(finalBoundValue?.includes(option.controlID ?? index))}
                            {...option}
                            key={option.controlID ?? index}
                            controlID={option.controlID ?? index}
                            checked={finalBoundValue?.includes(option.controlID ?? index)}
                            onPress={onChange}
                        />
                    ))
                ) : (
                    dataSourceRows?.map((row) => (
                        <CheckBox
                            {...getCheckboxItemProps?.(finalBoundValue?.includes(row.key))}
                            key={row.key}
                            controlID={row.key}
                            checked={finalBoundValue?.includes(row.key)}
                            label={row.value as string | null ?? undefined}
                            onPress={onChange}
                        />
                    ))
                )
            }
        </View>
    );
};
export default CheckboxGroup;
const useStyles = makeStyles(theme => ({
    controlLabel: {
        marginLeft: theme.spacing.md
    }
}));
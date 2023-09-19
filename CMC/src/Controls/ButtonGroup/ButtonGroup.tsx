import React, { useCallback } from "react";
import { ButtonGroup as RNEUIButtonGroup, ButtonGroupProps as RNEUIButtonGroupProps } from '@rneui/themed';
import { IKeyValueDataSource, IKeyValueElement, IObjectDatabind, IRowDatabind, useDataSource, useDatabind } from "@harpreet547/cdh";

export interface IButtonGroupProps extends Omit<RNEUIButtonGroupProps, 'buttons' | 'button' | 'onPress'> {
    datasource?: IKeyValueDataSource;
    databind?: IRowDatabind | IObjectDatabind;
    buttons?: {
        key: number;
        value: string | React.ReactElement;
    }[];
    onPress?: (value: number | number[] | undefined) => void;
}
const ButtonGroup: React.FC<IButtonGroupProps> = (props: IButtonGroupProps): React.ReactElement => {
    const { datasource, databind, buttons, selectedIndex, selectedIndexes, ...buttonGroupProps } = props;

    const datasourceRows = useDataSource('KeyValueDataSource', datasource) as IKeyValueElement[] | undefined;
    const finalDatasourceRows = datasourceRows ?? buttons;

    const {
        boundValue,
        updateBoundValue,
    } = useDatabind<number | number[] | undefined | null>(databind);

    const finalBoundValue = boundValue ?? selectedIndexes ?? selectedIndex;

    const onClick = (value: number | number[]) => {

        if (Array.isArray(value)) {
            const selectedKeys = finalDatasourceRows
                ?.filter((row, index) => value.includes(index))
                ?.map(row => row.key);
            props.onPress?.(selectedKeys as number[] | undefined | null ?? undefined);
            updateBoundValue(selectedKeys as number[] | undefined | null);
        } else {
            const selectedKey = finalDatasourceRows
                ?.find((row, index) => index === value)
                ?.key;
            props.onPress?.(selectedKey as number | undefined | null ?? undefined);
            updateBoundValue(selectedKey as number | undefined | null);
        }

    };

    const getSelectedIndexes = useCallback(() => {
        const indexes: number[] = [];
        finalDatasourceRows?.forEach((row, index) => {
            if ((finalBoundValue as number[]).includes(row.key as number))
                indexes.push(index);
        });
        return indexes;
    }, [finalBoundValue, finalDatasourceRows]);

    const getSelectedIndex = useCallback(() => {
        let selected: number | undefined;

        finalDatasourceRows?.every((row, index) => {
            if ((finalBoundValue as number) === row.key) {
                selected = index;
                return false;
            } else {
                return true;
            }
        });
        return selected;
    }, [finalBoundValue, finalDatasourceRows]);

    return (
        <RNEUIButtonGroup
            {...buttonGroupProps}
            buttons={finalDatasourceRows?.map(row => row.value) as string[] | undefined}
            onPress={onClick}
            selectedIndexes={Array.isArray(finalBoundValue) ? getSelectedIndexes() : undefined}
            selectedIndex={typeof finalBoundValue === 'number' ? getSelectedIndex() : undefined}

        />
    );
};
export default ButtonGroup;
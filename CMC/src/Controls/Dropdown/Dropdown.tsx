import React, { useCallback, useMemo, useState } from 'react';
import {
    BottomSheet as NativeElementBottomSheet,
    BottomSheetProps as NativeElementBottomSheetProps,
    ListItem,
    Text,
} from '@rneui/base';
import { GestureResponderEvent, View, ViewStyle } from 'react-native';
import {
    useDataSource,
    IKeyValueDataSource,
    IKeyValueElement,
    useDatabind,
    IRowDatabind,
    IObjectDatabind,
    ControlTypes,
} from '@harpreet547/cdh';
import Button, { IButtonProps } from '../Button/Button';
import ControlLabel from '../Label/ControlLabel';
import DropdownListItem, { IDropdownListElement } from './DropdownListItem';
import { makeStyles } from '@rneui/themed';

interface IDropdownButtonProps extends Omit<IButtonProps, 'title'> {
    placeholder?: string;
}
export interface IDropdownProps extends Omit<NativeElementBottomSheetProps, 'isVisible'>, ControlTypes.ILocalizedLabel {
    button?: IDropdownButtonProps;
    listElements?: IDropdownListElement[];
    dataSource?: IKeyValueDataSource;
    databind?: IObjectDatabind | IRowDatabind;
    cancelText?: string;
    cancelTextLocalizedID?: string;
    value?: string | number;
    onPress?: (key: string | number | null) => void;
    onDismiss?: () => void;
}
const Dropdown: React.FC<IDropdownProps> = (props: IDropdownProps): React.ReactElement => {
    const {
        label,
        labelLocalizedID,
        button,
        dataSource,
        listElements,
        cancelText,
        cancelTextLocalizedID,
        onDismiss,
        value,
        onPress,
        databind,
        ...DropdownProps
    } = props;

    const { onPress: onPressButton } = button ?? {};

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const styles = useStyles();

    const dataSourceRows = useDataSource('KeyValueDataSource', dataSource) as IKeyValueElement[] | undefined;
    const finalRows = dataSourceRows ?? listElements;

    const { boundValue, updateBoundValue } = useDatabind(databind);
    const finalValue = (boundValue as string | undefined) ?? value;

    const selectedText = useMemo(() => {
        return finalRows?.find(row => `${row.key}` === `${finalValue}`)?.value;
    }, [finalRows, finalValue]);

    const onButtonPress = useCallback((event: GestureResponderEvent) => {
        setIsVisible(true);
        onPressButton?.(event);
    }, [onPressButton]);

    const onCancel = useCallback(() => {
        setIsVisible(false);
        onDismiss?.();
    }, [onDismiss]);

    const onClickListItem = useCallback((controlID: string | number | null) => {
        updateBoundValue(controlID);
        onPress?.(controlID);
        onCancel();
    }, [onCancel, onPress, updateBoundValue]);

    return (
        <View>
            <ControlLabel
                label={label}
                labelLocalizedID={labelLocalizedID}
                style={styles.controlLabel}
            />
            <Button
                {...button}
                title={(
                    <DropdownButtonTitle
                        text={(selectedText as string | undefined) ?? button?.placeholder}
                    />
                )}
                style={{
                    ...styles.button,
                    ...(button?.style as ViewStyle | undefined)
                }}
                onPress={onButtonPress}
            />

            <NativeElementBottomSheet
                {...DropdownProps}
                isVisible={isVisible}
                modalProps={{}}
            >
                {
                    finalRows?.map((row) => (
                        <DropdownListItem
                            {...row}
                            key={row.key?.toString()}
                            controlID={row.key}
                            onPress={onClickListItem}
                        />
                    ))
                }
                <DropdownListItem
                    key={'cancel'}
                    value={cancelText ?? 'Cancel'}
                    controlID={null}
                    onPress={onCancel}
                    titleStyle={{
                        ...styles.cancelText,
                    }}
                />

            </NativeElementBottomSheet>

        </View>
    );
};
export default Dropdown;

const useStyles = makeStyles(theme => ({
    cancelText: {
        color: theme.colors.red,
    },
    button: {
        margin: theme.spacing.sm,
    },
    controlLabel: {
        marginLeft: theme.spacing.sm
    }
}));

interface IDropdownButtonTitleProps {
    text?: string;
}
const DropdownButtonTitle: React.FC<IDropdownButtonTitleProps> = (props: IDropdownButtonTitleProps): React.ReactElement => {
    const styles = useDropdownButtonStyles();

    return (
        <View style={styles.buttonRoot}>
            <Text style={styles.buttonText} >{props.text ?? ''}</Text>
            <ListItem.Chevron
                style={{
                    transform: [{ rotate: '90deg' }],
                }}
                iconStyle={styles.chevron}
            />
        </View>
    );
};

const useDropdownButtonStyles = makeStyles(theme => ({
    buttonText: {
        color: theme.colors.text,
    },
    buttonRoot: {
        padding: theme.spacing.sm,
        display: 'flex',
        gap: theme.spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    chevron: {
        color: theme.colors.text
    },
    controlLabel: {
        marginLeft: theme.spacing.md
    }
}));
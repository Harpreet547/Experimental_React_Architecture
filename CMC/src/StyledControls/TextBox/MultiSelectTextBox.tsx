import React, { useCallback, useRef } from "react";
import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from "react-native";
import TextBox, { ITextBoxProps } from "../../Controls/TextBox/TextBox";
import Text from "../../Controls/Text/Text";
import { useDatabind } from "@harpreet547/cdh";
import { Input } from "@rneui/base";
import { Icon, makeStyles, useTheme } from "@rneui/themed";
import { APPEARANCE } from "../Types";

interface IMultiSelectTextBoxProps extends Omit<ITextBoxProps, 'value'> {
    onAdd?: (selectedOptions: string) => void;
    value?: string[];
    clearItem?: (index: number) => void;
    appearance?: APPEARANCE;
}
const MultiSelectTextBox: React.FC<IMultiSelectTextBoxProps> = (props: IMultiSelectTextBoxProps): React.ReactElement => {
    const { onAdd, onSubmitEditing, appearance, value, clearItem, databind, ...textboxProps } = props;

    const styles = useStyles();

    const ref = useRef<TextInput & Input>(null);

    const {
        boundValue,
        updateBoundValue,
    } = useDatabind<string[] | null>(databind);

    const finalBoundValue = boundValue ?? value;

    const onReturnPress = useCallback((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {

        if (databind) {
            updateBoundValue([...(boundValue ?? []), e.nativeEvent.text]);
        }

        onAdd?.(e.nativeEvent.text);
        onSubmitEditing?.(e);

        ref.current?.clear?.();
    }, [boundValue, databind, onAdd, onSubmitEditing, updateBoundValue]);

    const removeItem = useCallback((index: number) => {

        if (databind) {
            const boundCopy = [...(boundValue ?? [])];
            boundCopy.splice(index, 1);
            updateBoundValue(boundCopy);
        }

        clearItem?.(index);
    }, [boundValue, clearItem, databind, updateBoundValue]);

    const getInputContainerAppearanceStyle = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.inputContainerPrimary;
            case 'SECONDARY':
                return styles.inputContainerSecondary;
            default:
                return styles.inputContainerSecondary;
        }
    }, [appearance, styles.inputContainerPrimary, styles.inputContainerSecondary]);

    return (
        <View>
            <TextBox
                {...textboxProps}
                onSubmitEditing={onReturnPress}
                textBoxRef={ref}
                inputContainerStyle={{
                    ...styles.inputContainer,
                    ...(getInputContainerAppearanceStyle())
                }}
            />
            <View
                style={styles.selectedItemsRoot}
            >
                {
                    finalBoundValue?.map?.((val, index) => (
                        <SelectedItem
                            index={index}
                            key={index}
                            onClear={removeItem}
                            text={val}
                            appearance={appearance}
                        />
                    ))
                }
            </View>
        </View>
    );
};
export default MultiSelectTextBox;

const useStyles = makeStyles(theme => ({
    inputContainer: {
        borderWidth: 1,
        borderRadius: theme.spacing.md,

        marginTop: theme.spacing.sm,

        // backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
    },
    inputContainerSecondary: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.secondary,
    },
    inputContainerPrimary: {
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
    },
    selectedItemsRoot: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginHorizontal: theme.spacing.md,
    }
}));

interface ISelectedItemProps {
    onClear: (index: number) => void;
    index: number;
    text: string;
    appearance: APPEARANCE | undefined;
}
const SelectedItem: React.FC<ISelectedItemProps> = (props: ISelectedItemProps): React.ReactElement => {
    const { index, onClear, text, appearance } = props;

    const styles = useSelectedItemStyles();
    const { theme } = useTheme();

    const onRemove = useCallback(() => {
        onClear(index);
    }, [index, onClear]);

    const getRootAppearanceStyle = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.rootPrimary;
            case 'SECONDARY':
                return styles.rootSecondary;
            default:
                return styles.rootSecondary;
        }
    }, [appearance, styles.rootPrimary, styles.rootSecondary]);

    const getAppearanceColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return theme.colors.secondary;
            case 'SECONDARY':
                return theme.colors.primary;
            default:
                return theme.colors.primary;
        }
    }, [appearance, theme.colors.primary, theme.colors.secondary]);

    return (
        <TouchableOpacity
            style={{
                ...styles.root,
                ...getRootAppearanceStyle(),
            }}
            onPress={onRemove}
        >
            <Text
                label={text}
            />
            <Icon
                name="close"
                color={getAppearanceColor()}
            />
        </TouchableOpacity>
    );
};

const useSelectedItemStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing.xs,
        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,

        borderRadius: theme.spacing.lg,
    },
    rootPrimary: {
        backgroundColor: theme.colors.primary,
    },
    rootSecondary: {
        backgroundColor: theme.colors.secondary,
    }
}));
import React, { useCallback } from "react";
import BaseButtonGroup, { IButtonGroupProps as IBaseButtonGroupProps } from "../../Controls/ButtonGroup/ButtonGroup";
import { makeStyles, useTheme } from "@rneui/themed";
import { TextStyle, ViewStyle } from "react-native";
import { APPEARANCE } from "../Types";

interface IButtonGroupProps extends IBaseButtonGroupProps {
    appearance?: APPEARANCE;
}
const ButtonGroup: React.FC<IButtonGroupProps> = (props: IButtonGroupProps): React.ReactElement => {
    const { appearance } = props;

    const { theme } = useTheme();
    const styles = useStyles();

    const getAppearanceColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return theme.colors.secondary;
            case 'SECONDARY':
                return theme.colors.primary;
            default:
                return theme.colors.secondary;
        }
    }, [appearance, theme.colors.primary, theme.colors.secondary]);

    const getAppearanceInverseColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return theme.colors.primary;
            case 'SECONDARY':
                return theme.colors.secondary;
            default:
                return theme.colors.primary;
        }
    }, [appearance, theme.colors.primary, theme.colors.secondary]);

    return (
        <BaseButtonGroup
            {...props}
            containerStyle={{
                ...styles.container,
                ...(props.containerStyle as ViewStyle),
            }}
            innerBorderStyle={styles.innerBorder}
            buttonStyle={{
                ...styles.button,
                backgroundColor: getAppearanceColor(),
                ...(props.buttonStyle as ViewStyle),
            }}
            textStyle={{
                color: getAppearanceInverseColor(),
                ...(props.textStyle as TextStyle)
            }}
            selectedTextStyle={{
                ...styles.selectedText,
                color: getAppearanceInverseColor(),
                ...(props.selectedTextStyle as TextStyle)
            }}
            selectedButtonStyle={{
                ...styles.selectedButton,
                backgroundColor: getAppearanceColor(),
                borderColor: getAppearanceInverseColor(),
                ...(props.selectedButtonStyle as ViewStyle)
            }}
        />
    );
};
export default ButtonGroup;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    innerBorder: {
        width: 0,
    },
    button: {
        borderRadius: theme.spacing.lg,
    },
    selectedText: {
        fontWeight: theme.spacing.fontWeight.bolder,
    },
    selectedButton: {
        borderWidth: 1,
    }
}));
import React, { useCallback } from 'react';
import CheckboxGroup, { ICheckboxGroupProps } from '../../Controls/CheckBox/CheckboxGroup';
import { makeStyles, useTheme } from '@rneui/themed';
import { APPEARANCE } from '../Types';

interface ICardCheckboxGroupProps extends ICheckboxGroupProps {
    appearance?: APPEARANCE;
}
const CardCheckboxGroup: React.FC<ICardCheckboxGroupProps> = (props: ICardCheckboxGroupProps): React.ReactElement => {
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
                return theme.colors.primary;
        }
    }, [appearance, theme.colors.primary, theme.colors.secondary]);

    const getWrapperAppearanceStyle = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.wrapperPrimary;
            case 'SECONDARY':
                return styles.wrapperSecondary;
            default:
                return styles.wrapperSecondary;
        }
    }, [appearance, styles.wrapperPrimary, styles.wrapperSecondary]);

    return (
        <CheckboxGroup
            {...props}
            getCheckboxItemProps={(isChecked?: boolean) => ({
                checkedColor: getAppearanceColor(),
                uncheckedColor: getAppearanceColor(),
                wrapperStyle: {
                    ...styles.root,
                    ...(getWrapperAppearanceStyle()),
                    borderColor: isChecked ? getAppearanceColor() : undefined,
                    borderWidth: isChecked ? 1 : undefined,
                },
                textStyle: {
                    color: getAppearanceColor(),
                },
                ...props.getCheckboxItemProps?.(isChecked),
            })}
        />
    );
};
export default CardCheckboxGroup;

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing.md,
        borderRadius: theme.spacing.lg
    },
    wrapperPrimary: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.secondary,
    },
    wrapperSecondary: {
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.primary,
    }
}));
import React, { useCallback } from 'react';
import { makeStyles, useTheme } from "@rneui/themed";
import RadioGroup, { IRadioGroupProps } from '../../Controls/RadioGroup/RadioGroup';
import { APPEARANCE } from '../Types';

interface ICardRadioGroupProps extends IRadioGroupProps {
    appearance?: APPEARANCE;
}
const CardRadioGroup: React.FC<ICardRadioGroupProps> = (props: ICardRadioGroupProps): React.ReactElement => {
    const { appearance } = props;

    const { theme } = useTheme();

    const styles = useStyles();

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
        <RadioGroup
            {...props}
            getRadioItemProps={(isSelected?: boolean) => ({
                checkedColor: getAppearanceColor(),
                uncheckedColor: getAppearanceColor(),
                wrapperStyle: {
                    ...styles.root,
                    ...(getWrapperAppearanceStyle()),
                    borderColor: isSelected ? getAppearanceColor() : undefined,
                    borderWidth: isSelected ? 1 : undefined,
                },
                textStyle: {
                    color: getAppearanceColor(),
                },
                ...props.getRadioItemProps?.(isSelected),
            })}
        />
    );
};
export default CardRadioGroup;

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
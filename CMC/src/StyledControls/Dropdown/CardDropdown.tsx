import React, { useCallback } from 'react';
import Dropdown, { IDropdownProps } from '../../Controls/Dropdown/Dropdown';
import { makeStyles } from '@rneui/themed';
import { ViewStyle } from 'react-native';
import { APPEARANCE } from '../Types';

interface ICardDropdownProps extends IDropdownProps {
    appearance?: APPEARANCE;
}
const CardDropdown: React.FC<ICardDropdownProps> = (props: ICardDropdownProps): React.ReactElement => {
    const { appearance, ...restProps } = props;

    const styles = useStyles();

    const getAppearanceStyle = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.buttonPrimary;
            case 'SECONDARY':
                return styles.buttonSecondary;
            default:
                return styles.buttonSecondary;
        }
    }, [appearance, styles.buttonPrimary, styles.buttonSecondary]);

    return (
        <Dropdown
            {...restProps}
            button={{
                ...props.button,
                buttonStyle: {
                    ...(props.button?.buttonStyle as ViewStyle | undefined),
                    ...(getAppearanceStyle()),
                    ...styles.button,
                }
            }}
        />
    );
};
export default CardDropdown;

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: theme.spacing.lg,
        paddingVertical: theme.spacing.sm, //+ theme.spacing.xs,
    },
    buttonPrimary: {
        backgroundColor: theme.colors.primary,
    },
    buttonSecondary: {
        backgroundColor: theme.colors.secondary,
    }
}));
import React, { useCallback } from 'react';
import LinkButton from './LinkButton';
import { IButtonProps } from '../../Controls/Button/Button';
import { TextStyle } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import { APPEARANCE } from '../Types';

interface ITextButton extends IButtonProps {
    appearance?: APPEARANCE;
}
const TextButton: React.FC<ITextButton> = (props: ITextButton): React.ReactElement => {
    const { titleStyle, icon, appearance, ...restProps } = props;

    const { theme } = useTheme();
    const styles = useStyles();

    const getAppearanceStyle = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.primary;
            case 'SECONDARY':
                return styles.secondary;
            default:
                return styles.primary;
        }
    }, [appearance, styles.primary, styles.secondary]);

    const getAppearanceColor = useCallback(() => {
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
        <LinkButton
            {...restProps}
            titleStyle={{
                ...styles.title,
                ...(getAppearanceStyle()),
                ...(titleStyle as TextStyle)
            }}
            icon={typeof icon === 'boolean' ? icon : {
                color: getAppearanceColor(),
                ...icon,
            }}
        />
    );
};
export default TextButton;

const useStyles = makeStyles(theme => ({
    title: {
        textDecorationLine: 'none',
    },
    primary: {
        color: theme.colors.primary,
    },
    secondary: {
        color: theme.colors.secondary,
    }
}));
import React, { useCallback } from 'react';
import Button, { IButtonProps } from '../../Controls/Button/Button';
import { makeStyles, useTheme } from '@rneui/themed';
import { TextStyle, ViewStyle } from 'react-native';
import { APPEARANCE } from '../Types';

interface ILinkButtonProps extends IButtonProps {
    appearance?: APPEARANCE;
}
const LinkButton: React.FC<ILinkButtonProps> = (props: ILinkButtonProps): React.ReactElement => {
    const { titleStyle, appearance, buttonStyle, containerStyle, icon, ...restProps } = props;

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
        <Button
            {...restProps}
            titleStyle={{
                ...styles.title,
                ...(getAppearanceStyle()),
                ...(titleStyle as TextStyle),
            }}
            buttonStyle={{
                ...styles.button,
                ...(buttonStyle as ViewStyle)
            }}
            containerStyle={{
                ...styles.containerStyle,
                ...(containerStyle as ViewStyle)
            }}
            icon={typeof icon === 'boolean' ? icon : {
                color: getAppearanceColor(),
                ...icon,
            }}
        />
    );
};
export default LinkButton;

const useStyles = makeStyles(theme => ({
    title: {
        textDecorationLine: 'underline',
        color: theme.colors.secondary,
        display: 'flex',
        textAlign: 'left',
        paddingHorizontal: 0,
        paddingVertical: 0,
        padding: 0,
    },
    button: {
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        textAlign: 'left',
        paddingVertical: 0,
        paddingHorizontal: 0,
        padding: 0

    },
    containerStyle: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        padding: 0,
    },
    icon: {
        color: theme.colors.secondary,
    },
    primary: {
        color: theme.colors.primary,
    },
    secondary: {
        color: theme.colors.secondary,
    }
}));
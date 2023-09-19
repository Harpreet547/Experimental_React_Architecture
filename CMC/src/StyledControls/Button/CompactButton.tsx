import React, { useCallback } from 'react';
import Button, { IButtonProps } from '../../Controls/Button/Button';
import { makeStyles } from '@rneui/themed';
import { TextStyle, ViewStyle } from 'react-native';
import { APPEARANCE } from '../Types';

interface ICompactButton extends IButtonProps {
    appearance?: APPEARANCE;
}
const CompactButton: React.FC<ICompactButton> = (props: ICompactButton): React.ReactElement => {
    const { buttonStyle, titleStyle, appearance, ...restProps } = props;

    const styles = useStyles();

    const getButtonAppearanceStyle = useCallback(() => {
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
        <Button
            {...restProps}
            buttonStyle={{
                ...styles.button,
                ...getButtonAppearanceStyle(),
                ...(buttonStyle as ViewStyle)
            }}
            titleStyle={{
                ...styles.title,
                ...(titleStyle as TextStyle)
            }}
        />
    );
};
export default CompactButton;

const useStyles = makeStyles(theme => ({
    button: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
    },
    buttonPrimary: {
        backgroundColor: theme.colors.primary,
    },
    buttonSecondary: {
        backgroundColor: theme.colors.secondary,
    },
    title: {
        color: theme.colors.text
    }
}));
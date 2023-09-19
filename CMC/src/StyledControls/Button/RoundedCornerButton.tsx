import React, { useCallback } from 'react';
import Button, { IButtonProps } from '../../Controls/Button/Button';
import { makeStyles } from '@rneui/themed';
import { ViewStyle } from 'react-native';
import { APPEARANCE } from '../Types';

interface IRoundedCornerButtonProps extends IButtonProps {
    appearance?: APPEARANCE;
}
const RoundedCornerButton: React.FC<IRoundedCornerButtonProps> = (props: IRoundedCornerButtonProps): React.ReactElement => {
    const { style, buttonStyle, appearance, ...restProps } = props;

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
            style={{
                ...styles.roundedCornerButton,
                ...(style as ViewStyle),
            }}
            buttonStyle={{
                ...getButtonAppearanceStyle(),
                ...(buttonStyle as ViewStyle),
            }}
            titleStyle={styles.title}
        />
    );
};
export default RoundedCornerButton;

const useStyles = makeStyles((theme) => ({
    roundedCornerButton: {
        margin: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderRadius: theme.spacing.lg,
        overflow: 'hidden',
    },
    buttonPrimary: {
        backgroundColor: theme.colors.primary,
    },
    buttonSecondary: {
        backgroundColor: theme.colors.secondary,
    },
    title: {
        color: theme.colors.white, // TODO: hadcoded wait for dark theme
    }
}));
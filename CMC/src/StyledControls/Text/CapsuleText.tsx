import React, { useCallback } from 'react';
import Text, { TextProps } from '../../Controls/Text/Text';
import { makeStyles } from '@rneui/themed';
import { TextStyle } from 'react-native';
import { APPEARANCE } from '../Types';

interface ICapsuleText extends TextProps {
    appearance?: APPEARANCE;
}
const CapsuleText: React.FC<ICapsuleText> = (props: ICapsuleText): React.ReactElement => {
    const { style, appearance, ...restStyles } = props;
    const styles = useStyles();

    const getBGAppearanceColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.rootBGPrimary;
            case 'SECONDARY':
                return styles.rootBGSecondary;
            default:
                return styles.rootBGSecondary;
        }
    }, [appearance, styles.rootBGPrimary, styles.rootBGSecondary]);

    const getFontAppearanceColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.textSecondary;
            case 'SECONDARY':
                return styles.textPrimary;
            default:
                return styles.textPrimary;
        }
    }, [appearance, styles.textPrimary, styles.textSecondary]);

    return (
        <Text
            {...restStyles}
            style={{
                ...styles.root,
                ...(getBGAppearanceColor()),
                ...(getFontAppearanceColor()),
                ...(style as TextStyle)
            }}
        />
    );
};
export default CapsuleText;

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing.sm,

        borderRadius: theme.spacing.md,
        overflow: 'hidden',

        flexShrink: 1,
        display: 'flex',
        textAlign: 'center'
    },
    rootBGSecondary: {
        backgroundColor: theme.colors.secondary,
    },
    rootBGPrimary: {
        backgroundColor: theme.colors.primary,
    },
    textPrimary: {
        color: theme.colors.primary,
    },
    textSecondary: {
        color: theme.colors.secondary,
    }
}));
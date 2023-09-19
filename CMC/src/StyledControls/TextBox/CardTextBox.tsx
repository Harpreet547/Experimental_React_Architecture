import React, { useCallback } from 'react';
import TextBox, { ITextBoxProps } from '../../Controls/TextBox/TextBox';
import { makeStyles } from '@rneui/themed';
import { APPEARANCE } from '../Types';

interface ICardTextBoxProps extends ITextBoxProps {
    appearance?: APPEARANCE;
}
const CardTextBox: React.FC<ICardTextBoxProps> = (props: ICardTextBoxProps): React.ReactElement => {
    const { appearance } = props;

    const styles = useStyles();

    const getWrapperAppearanceStyle = useCallback(() => {
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
        <TextBox
            {...props}
            multiline
            inputContainerStyle={{
                ...styles.inputContainer,
                ...getWrapperAppearanceStyle(),
            }}
            style={styles.input}
        />
    );
};
export default CardTextBox;

const useStyles = makeStyles(theme => ({
    inputContainer: {
        borderWidth: 1,
        borderRadius: theme.spacing.md,

        marginTop: theme.spacing.sm,

        padding: theme.spacing.md,
    },
    inputContainerSecondary: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.secondary,
    },
    inputContainerPrimary: {
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.primary,
    },
    input: {
        minHeight: theme.spacing.xl * 2,
    }
}));
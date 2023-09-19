import React, { useCallback } from "react";
import CompactButton from "../Button/CompactButton";
import { Icon, makeStyles, useTheme } from "@rneui/themed";
import { View } from 'react-native';
import TextBox from "../../Controls/TextBox/TextBox";
import { APPEARANCE } from "../Types";

interface ISpinnerProps {
    onAddClick: () => void;
    onMinusClick: () => void;
    onChange: (text: string) => void;
    value: number;
    appearance?: APPEARANCE;
}
const Spinner: React.FC<ISpinnerProps> = (props: ISpinnerProps): React.ReactElement => {
    const { onAddClick, onChange, onMinusClick, appearance, value } = props;

    const styles = useStyles();
    const { theme } = useTheme();

    const getAppearanceColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return theme.colors.primary;
            case 'SECONDARY':
                return theme.colors.secondary;
            default:
                return theme.colors.secondary;
        }
    }, [appearance, theme.colors.primary, theme.colors.secondary]);

    const getInputContainerAppearanceStyle = useCallback(() => {
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
        <View style={styles.selectLotsContainer} >
            <CompactButton
                buttonStyle={styles.lotsBtn}
                onPress={onMinusClick}
                icon={<Icon name="remove-circle-outline" color={getAppearanceColor()} />}
            />

            <TextBox
                multiline
                inputContainerStyle={{
                    ...styles.inputContainer,
                    ...getInputContainerAppearanceStyle(),
                }}
                style={styles.input}
                errorStyle={styles.hideTextboxError}
                onChangeText={onChange}
                keyboardType="number-pad"
                value={`${value}`}
            />

            <CompactButton
                buttonStyle={styles.lotsBtn}
                onPress={onAddClick}
                icon={<Icon name="add-circle-outline" color={getAppearanceColor()} />}
            />
        </View>
    );
};
export default Spinner;


const useStyles = makeStyles(theme => ({
    inputContainer: {
        borderWidth: 1,
        borderRadius: theme.spacing.md,

        minWidth: 250,

        backgroundColor: theme.colors.cardBackground2,
    },
    inputContainerPrimary: {
        borderColor: theme.colors.primary,
    },
    inputContainerSecondary: {
        borderColor: theme.colors.secondary,
    },
    input: {
        textAlign: 'center',
        minHeight: theme.spacing.md,
        paddingTop: 0,
        margin: theme.spacing.sm,
    },
    selectLotsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: theme.spacing.md
    },
    lotsBtn: {
        backgroundColor: 'transparent',
        borderRadius: theme.spacing.lg,
    },
    hideTextboxError: {
        display: 'none'
    }
}));
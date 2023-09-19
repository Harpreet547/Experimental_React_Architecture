import React from 'react';
import TextBox, { ITextBoxProps } from '../../Controls/TextBox/TextBox';
import { makeStyles, useTheme } from '@rneui/themed';
import { ViewStyle } from 'react-native';

const SearchBox: React.FC<ITextBoxProps> = (props: ITextBoxProps): React.ReactElement => {
    const { inputContainerStyle, containerStyle, placeholder, ...textboxProps } = props;

    const { theme } = useTheme();
    const styles = useStyles();

    return (
        <TextBox
            {...textboxProps}
            placeholder={placeholder ?? 'Search'}
            leftIcon={{
                name: 'search',
                color: theme.colors.text,
            }}
            inputContainerStyle={{
                ...styles.inputContainer,
                ...(inputContainerStyle as ViewStyle)
            }}
            containerStyle={{
                ...styles.container,
                ...(containerStyle as ViewStyle)
            }}
            errorStyle={{ display: 'none' }} // Occupy space, even if no error. Implement logic to show error when it occurs
        />
    );
};
export default SearchBox;

const useStyles = makeStyles(theme => ({
    inputContainer: {
        borderColor: 'transparent',
        borderRadius: theme.spacing.lg,
        backgroundColor: theme.colors.cardBackground,

        paddingHorizontal: theme.spacing.md,
        paddingVertical: 0,
    },
    container: {
        paddingVertical: 0,
    }
}));
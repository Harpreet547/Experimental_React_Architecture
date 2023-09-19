import React from 'react';
import Button, { IButtonProps } from '../../Controls/Button/Button';
import { makeStyles } from '@rneui/themed';
import { ViewStyle } from 'react-native';

export type IconButtonProps = Omit<IButtonProps, 'label' | 'labelLocalizedID'>;
const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps): React.ReactElement => {
    const { buttonStyle, ...restProps } = props;

    const styles = useStyles();

    return (
        <Button
            {...restProps}
            buttonStyle={{
                ...styles.button,
                ...(buttonStyle as ViewStyle)
            }}
        />
    );
};
export default IconButton;

const useStyles = makeStyles(theme => ({
    button: {
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: theme.spacing.xs
    }
}));
import React from 'react';
import { Text, TextProps } from '@rneui/base';
import { ControlTypes } from '@harpreet547/cdh';
import { makeStyles } from '@rneui/themed';
import { TextStyle } from 'react-native';

interface IControlLabelProps extends TextProps, ControlTypes.ILocalizedLabel {

}
const ControlLabel: React.FC<IControlLabelProps> = (props: IControlLabelProps): React.ReactElement => {
    const { label, labelLocalizedID, ...textProps } = props;

    const styles = useStyles();

    return (
        <Text
            {...textProps}
            style={{
                ...styles.text,
                ...(props.style as TextStyle),
            }}
        >
            {label}
        </Text>
    );
};
export default ControlLabel;

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.colors.text,
    }
}));
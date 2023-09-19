import { ControlTypes } from '@harpreet547/cdh';
import { makeStyles } from '@rneui/themed';
import React from 'react';
import { Text as ReactElementText, TextProps as ReactElementTextProps } from '@rneui/base';
import { TextStyle } from 'react-native';

export interface TextProps extends ReactElementTextProps, ControlTypes.ILocalizedLabel {
    h5?: boolean;
    h6?: boolean;
}
const Text: React.FC<TextProps> = (props: TextProps): React.ReactElement => {
    const { label, labelLocalizedID, h5, h6 } = props;

    const styles = useStyles();

    const headingStyle = h5 ? styles.h5 : (h6 ? styles.h6 : {});

    return (
        <ReactElementText
            {...props}
            style={{
                ...styles.text,
                ...headingStyle,
                ...(props.style as TextStyle),
            }}
            h1Style={{
                ...styles.h1,
                ...(props.h1Style as TextStyle)
            }}
            h2Style={{
                ...styles.h2,
                ...(props.h2Style as TextStyle)
            }}
            h3Style={{
                ...styles.h3,
                ...(props.h3Style as TextStyle)
            }}
            h4Style={{
                ...styles.h4,
                ...(props.h4Style as TextStyle)
            }}
        >
            {
                label
            }
        </ReactElementText>
    );
};
export default Text;

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.colors.text,
    },
    h1: {
        fontSize: theme.spacing.fontSize.h1
    },
    h2: {
        fontSize: theme.spacing.fontSize.h2
    },
    h3: {
        fontSize: theme.spacing.fontSize.h3
    },
    h4: {
        fontSize: theme.spacing.fontSize.h4
    },
    h5: {
        fontSize: theme.spacing.fontSize.h5
    },
    h6: {
        fontSize: theme.spacing.fontSize.h6
    }
}));
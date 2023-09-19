import { Icon, makeStyles } from "@rneui/themed";
import React, { useCallback } from "react";
import { View } from "react-native";
import Text from "../Text/Text";

interface IMessageBarProps {
    message: string;
    messageLocalizationID?: string;
    type: 'ERROR' | 'SUCCESS' | 'WARNING' | 'INFO';
}
const MessageBar: React.FC<IMessageBarProps> = (props: IMessageBarProps): React.ReactElement => {
    const { type, message, messageLocalizationID } = props;

    const styles = useStyles();

    const getBackgroundColor = useCallback(() => {
        switch (type) {
            case 'ERROR':
                return styles.errorBackground;
            case 'WARNING':
                return styles.warningBackground;
            case 'INFO':
                return styles.infoBackground;
            case 'SUCCESS':
                return styles.successBackground;
        }
    }, [styles.errorBackground, styles.infoBackground, styles.successBackground, styles.warningBackground, type]);

    const getTextColor = useCallback(() => {
        switch (type) {
            case 'ERROR':
                return styles.errorText;
            case 'WARNING':
                return styles.warningText;
            case 'INFO':
                return styles.infoText;
            case 'SUCCESS':
                return styles.successText;
        }
    }, [styles.errorText, styles.infoText, styles.successText, styles.warningText, type]);

    const getIconName = useCallback(() => {
        switch (type) {
            case 'ERROR':
                return 'error';
            case 'WARNING':
                return 'warning';
            case 'INFO':
                return 'info';
            case 'SUCCESS':
                return 'check-circle';
        }
    }, [type]);

    return (
        <View
            style={[styles.root, getBackgroundColor()]}
        >
            <Icon
                name={getIconName()}
            />
            <Text
                label={message}
                labelLocalizedID={messageLocalizationID}
                style={getTextColor()}
            />
        </View>
    );
};
export default MessageBar;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: theme.spacing.md,
        alignItems: 'center',

        margin: theme.spacing.sm,
        padding: theme.spacing.sm,

        borderRadius: theme.spacing.sm,
    },
    successBackground: {
        backgroundColor: theme.colors.blue,
    },
    infoBackground: {
        backgroundColor: theme.colors.background,
    },
    warningBackground: {
        backgroundColor: theme.colors.yellow,
    },
    errorBackground: {
        backgroundColor: theme.colors.error,
    },
    successText: {
        color: theme.colors.black,
    },
    errorText: {
        color: theme.colors.black,
    },
    warningText: {
        color: theme.colors.black,
    },
    infoText: {
        color: theme.colors.text,
    }
}));
import React, { useCallback } from "react";
import { MessageBarType } from "./Types";
import { Warning24Regular, Info24Regular, ErrorCircle24Regular } from "@fluentui/react-icons";
import { Text, makeStyles, mergeClasses, shorthands } from "@fluentui/react-components";
import { tokens } from "../../Theme/Theme";

interface IMessageBarProps {
    type: MessageBarType;
    message: string;
    messageLocalizedID?: string;
}
const MessageBar: React.FC<IMessageBarProps> = (props: IMessageBarProps): React.ReactElement => {
    const { type, message, messageLocalizedID } = props;

    const styles = useStyles();

    const getIcons = useCallback(() => {
        switch (type) {
            case MessageBarType.error:
                return (
                    <ErrorCircle24Regular />
                );
            case MessageBarType.info:
                return (
                    <Info24Regular />
                );
            case MessageBarType.warning:
                return (
                    <Warning24Regular />
                );
        }
    }, [type]);

    const getRootColor = useCallback(() => {
        switch (type) {
            case MessageBarType.error:
                return styles.errorRoot;
            case MessageBarType.info:
                return styles.infoRoot;
            case MessageBarType.warning:
                return styles.warningRoot;
        }
    }, [styles.errorRoot, styles.infoRoot, styles.warningRoot, type]);

    return (
        <div className={mergeClasses(styles.root, getRootColor())} >
            {
                getIcons()
            }
            <Text>
                {
                    message
                }
            </Text>
        </div>
    );
};
export default MessageBar;

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...shorthands.gap(tokens.spacingHorizontalM),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.padding(tokens.spacingHorizontalS),
    },
    warningRoot: {
        backgroundColor: tokens.colorPaletteYellowBackground2,
    },
    errorRoot: {
        backgroundColor: tokens.colorPaletteRedBackground2,
    },
    infoRoot: {
        backgroundColor: tokens.colorNeutralBackground3,
    }
});
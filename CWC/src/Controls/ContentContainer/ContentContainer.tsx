import React from "react";
import { ControlTypes } from "@harpreet547/cdh";
import Text from "../Text/Text";
import { Subtitle1, Title1, makeStyles, shorthands } from "@fluentui/react-components";
import { tokens } from "../../Theme/Theme";

interface IContentContainerProps extends React.PropsWithChildren, ControlTypes.ILocalizedLabel {
    subTitle?: string;
    subTitleLocalizedID?: string;
}
const ContentContainer: React.FC<IContentContainerProps> = (props: IContentContainerProps): React.ReactElement => {
    const { label, labelLocalizedID, subTitle, subTitleLocalizedID } = props;

    const styles = useStyles();

    return (
        <div className={styles.root}>
            {
                label &&
                <Text as="h2">
                    <Title1>
                        {label}
                    </Title1>
                </Text>
            }
            <div className={styles.content}>
                <div
                    className={styles.subTitleRoot}
                >
                    <Subtitle1>
                        {
                            subTitle
                        }
                    </Subtitle1>
                </div>
                <div className={styles.childContainer} >
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    );
};
export default ContentContainer;

const useStyles = makeStyles({
    root: {
        ...shorthands.margin(tokens.spacingHorizontalL),
        ...shorthands.padding(tokens.spacingHorizontalL),

        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap(tokens.spacingHorizontalS),
    },
    content: {
        // ...shorthands.padding(tokens.spacingHorizontalL),
        ...shorthands.border(0, 'solid'),
        // ...shorthands.borderColor(tokens.colorBrandBackground2),
        ...shorthands.borderRadius(tokens.borderRadiusXLarge),
        ...shorthands.overflow("hidden"),
        boxShadow: tokens.shadow28
    },
    subTitleRoot: {
        minHeight: tokens.lineHeightHero800,
        backgroundColor: tokens.colorBrandBackground2,

        display: 'flex',
        alignItems: 'center',

        ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalM),
    },
    childContainer: {
        ...shorthands.padding(tokens.spacingHorizontalL),
    }
});
import React from "react";
import { Text as FluentText, TextProps as FluentTextProps } from '@fluentui/react-components';
import { ControlTypes } from "@harpreet547/cdh";

type TextProps = FluentTextProps & ControlTypes.ILocalizedLabel;

const Text: React.FC<TextProps> = (props: TextProps): React.ReactElement => {
    const { label, labelLocalizedID, ...textProps } = props;

    return (
        <FluentText
            {...textProps}
        >
            {
                label ?? textProps.children
            }
        </FluentText>
    );
};
export default Text;
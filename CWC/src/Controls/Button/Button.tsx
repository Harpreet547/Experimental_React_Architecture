import React from 'react';
import { ControlTypes } from '@harpreet547/cdh';
import {
    Button as FUIButton,
    ButtonProps as FUIButtonProps,
} from '@fluentui/react-components';

type IButtonProps = FUIButtonProps & ControlTypes.ILocalizedLabel & {
    // 
};
const Button: React.FC<IButtonProps> = (props: IButtonProps): React.ReactElement => {
    const { label, labelLocalizedID, ...buttonProps } = props;

    return (
        <FUIButton
            {...buttonProps}
        >
            {label}
        </FUIButton>
    );
};
export default Button;
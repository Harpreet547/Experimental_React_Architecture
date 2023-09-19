import React from 'react';
import { Button as NativeElementButton, ButtonProps as NativeElementButtonProps } from '@rneui/themed';
import { ControlTypes } from '@harpreet547/cdh';

export interface IButtonProps extends NativeElementButtonProps, ControlTypes.ILocalizedLabel {

}
const Button: React.FC<IButtonProps> = (props: IButtonProps): React.ReactElement => {
    const { label, labelLocalizedID, title, ...buttonProps } = props;
    return (
        <NativeElementButton
            {...buttonProps}
            title={label ?? title}
        />
    );
};
export default Button;
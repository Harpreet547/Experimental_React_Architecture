import React from 'react';
import { ControlTypes } from '@harpreet547/cdh';
import './ControlLabel.scss';
import { Label } from '@fluentui/react-components';

interface IControlLabelProps extends ControlTypes.ILocalizedLabel {
    htmlFor: string;
}
const ControlLabel: React.FC<IControlLabelProps> = (props: IControlLabelProps): React.ReactElement => {
    const { label/* , labelLocalizedID */, htmlFor } = props;

    return (
        <Label
            htmlFor={htmlFor}
            className='cruds-label'
        >
            {label}
        </Label>
    );
};
export default ControlLabel;
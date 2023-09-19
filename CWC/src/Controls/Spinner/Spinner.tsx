import React from "react";
import { Spinner as FluentSpinner, SpinnerProps } from '@fluentui/react-components';
import { ControlTypes } from "@harpreet547/cdh";

interface ISpinner extends Omit<SpinnerProps, 'label'>, ControlTypes.ILocalizedLabel {

}
const Spinner: React.FC<ISpinner> = (props: ISpinner): React.ReactElement => {
    const { label, labelLocalizedID, ...spinnerProps } = props;

    return (
        <FluentSpinner
            {...spinnerProps}
            label={label}
        />
    );
};
export default Spinner;
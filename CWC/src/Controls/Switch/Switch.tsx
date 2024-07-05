import React from "react";
import { Switch as FUISwitch, SwitchProps as FUISwitchProps, SwitchOnChangeData } from "@fluentui/react-switch";
import { IObjectDatabind, IRowDatabind } from "@harpreet547/cdh/dist/services/DatabindService/Types";
import { useDatabind } from "@harpreet547/cdh/dist/hooks/useDatabind";

export interface SwitchProps extends FUISwitchProps {
    databind?: IObjectDatabind | IRowDatabind;
}
const Switch: React.FC<SwitchProps> = (props: SwitchProps): React.ReactElement => {
    const { databind, onChange, ...rest } = props;

    const { boundValue, updateBoundValue } = useDatabind<boolean | undefined>(databind);

    const onChangeHandler = (_ev: React.ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
        updateBoundValue(data.checked);
        onChange?.(_ev, data);
    };

    return (
        <FUISwitch
            {...rest}
            checked={boundValue ?? false}
            onChange={onChangeHandler}
        />
    );
};
export default Switch;
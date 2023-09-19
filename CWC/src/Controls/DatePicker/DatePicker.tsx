import React, { useCallback, useId } from "react";
import { DatePicker as FluentDatePicker } from "@fluentui/react-datepicker-compat";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { getLabelClassName } from "../HelperFunctions";
import { ControlTypes, IDateOnly, IObjectDatabind, IRowDatabind, useDatabind, DateOnly, DateTime } from "@harpreet547/cdh";
import ControlLabel from "../ControlLabel/ControlLabel";

interface IDatePickerProps extends Omit<DatePickerProps, 'value'>, ControlTypes.ILocalizedLabel {
    labelPosition?: ControlTypes.labelPosition;
    databind?: IRowDatabind | IObjectDatabind;
    value?: IDateOnly;
    /**
     * should save JS Date to Databind instead of IDateOnly
     */
    shouldUseDate?: boolean;
}
const DatePicker: React.FC<IDatePickerProps> = (props: IDatePickerProps): React.ReactElement => {
    const { label, labelLocalizedID, labelPosition, databind, value, shouldUseDate, onSelectDate, id, ...datePickerProps } = props;

    const autoGeneratedID = useId();

    const finalID = id ?? autoGeneratedID + '-dropdown';

    const {
        boundValue,
        updateBoundValue
    } = useDatabind<IDateOnly | Date | null>(databind);

    const finalBoundValue = boundValue ?? value;

    const onChange = useCallback((date: Date | null | undefined) => {
        if (shouldUseDate) {
            updateBoundValue(date ? date : null);
        } else {
            updateBoundValue(date ? DateTime.fromDate(date) : null);
        }
        onSelectDate?.(date);
    }, [onSelectDate, shouldUseDate, updateBoundValue]);

    return (
        <div className={`cruds-controls-root ${getLabelClassName(labelPosition ?? 'Top')}`}>
            <ControlLabel
                htmlFor={finalID}
                label={label}
                labelLocalizedID={labelLocalizedID}
            />
            <FluentDatePicker
                {...datePickerProps}
                onSelectDate={onChange}
                value={finalBoundValue ? (finalBoundValue instanceof Date ? finalBoundValue : DateOnly.toDate(finalBoundValue)) : null}
            />
        </div>
    );
};
export default DatePicker;
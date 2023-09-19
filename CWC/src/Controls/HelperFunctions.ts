import { ControlTypes } from "@cruds/cdh";

export const getLabelClassName = (labelPosition: ControlTypes.labelPosition) => labelPosition === 'Left' ? (
    'cruds-controls-root-label-left'
) : (
    'cruds-controls-root-label-top'
);
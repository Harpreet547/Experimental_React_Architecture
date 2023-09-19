import React from "react";
import { Slider as RNEUISlider, SliderProps as RNEUISliderProps, makeStyles } from '@rneui/themed';
import { IObjectDatabind, IRowDatabind, useDatabind } from "@harpreet547/cdh";

interface ISliderProps extends RNEUISliderProps {
    databind?: IRowDatabind | IObjectDatabind;
}
const Slider: React.FC<ISliderProps> = (props: ISliderProps): React.ReactElement => {
    const { databind, value, ...sliderProps } = props;

    const styles = useStyles();

    const {
        boundValue,
        updateBoundValue,
    } = useDatabind<number | null | undefined>(databind);

    const finalBoundValue = boundValue ?? value;

    const onChange = (selectedValue: number) => {
        databind && updateBoundValue(selectedValue);
        props.onValueChange?.(selectedValue);
    };

    return (
        <RNEUISlider
            {...sliderProps}
            onValueChange={onChange}
            value={finalBoundValue}
            thumbStyle={styles.thumb}
        />
    );
};
export default Slider;

const useStyles = makeStyles(theme => ({
    thumb: {
        backgroundColor: theme.colors.primary
    }
}));
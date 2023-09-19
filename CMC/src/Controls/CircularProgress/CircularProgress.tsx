import React, { useEffect } from "react";
import { Svg, Circle } from "react-native-svg";
import Animated, {
    useAnimatedProps,
    useSharedValue,
} from "react-native-reanimated";
import { useTheme } from "@rneui/themed";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ICircularProgressProps {
    percentLeft: number;
}
const CircularProgress: React.FC<ICircularProgressProps> = (props: ICircularProgressProps): React.ReactElement => {
    const { percentLeft } = props;

    const { theme } = useTheme();

    const radius = theme.spacing.md;
    const circumference = radius * (2 * Math.PI);

    const progressCircle = useSharedValue(1);
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * progressCircle.value,
    }));

    useEffect(() => {
        progressCircle.value = (100 - percentLeft) / 100;// withTiming(0, {duration: 2000});
    }, [percentLeft, progressCircle]);

    // const interpolate = useCallback((start: number, end: number) => {
    //     const k = (percentLeft - 0) / 100;
    //     return Math.ceil((1 - k) * start + k * end) % 256;
    // }, [percentLeft]);

    // const color = useCallback(() => {
    //     const r = interpolate(255, 0);
    //     const g = interpolate(0, 255);
    //     const b = interpolate(0, 0);
    //     return `rgb(${r},${g},${b})`;
    // }, [interpolate]);

    return (
        <Svg
            style={{
                height: (radius + theme.spacing.xs + theme.spacing.xs) * 2,
                width: (radius + theme.spacing.xs + theme.spacing.xs) * 2,
            }}
        >
            <AnimatedCircle
                cx={radius + theme.spacing.xs + theme.spacing.xs}
                cy={radius + theme.spacing.xs + theme.spacing.xs}
                r={radius}
                stroke={theme.colors.cardBackground2}
                fill="transparent"
                strokeWidth={4}
                animatedProps={animatedProps}
            />
            <AnimatedCircle
                cx={radius + theme.spacing.xs + theme.spacing.xs}
                cy={radius + theme.spacing.xs + theme.spacing.xs}
                r={radius}
                stroke={theme.colors.blue} //{color()}
                strokeWidth={4}
                fill="transparent"
                strokeDasharray={circumference}
                strokeLinecap="round"
                animatedProps={animatedProps}
            />
        </Svg>
    );
};
export default CircularProgress;
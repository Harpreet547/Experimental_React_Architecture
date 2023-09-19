import React, { useCallback } from 'react';
import RadioGroup, { IRadioGroupProps } from '../../Controls/RadioGroup/RadioGroup';
import { makeStyles, useTheme } from '@rneui/themed';
import { GestureResponderEvent } from 'react-native';
import { IKeyValueDataSource, IKeyValueElement, useDataSource, useDatabind } from '@harpreet547/cdh';
import { APPEARANCE } from '../Types';

enum YESNO {
    YES = 1,
    NO = 2,
}
interface IYesNoSwitchProps extends Omit<IRadioGroupProps, 'onPress' | 'values'> {
    yesLabel?: string;
    yesLabelLocalizedID?: string;
    noLabel?: string;
    noLabelLocalizedID?: string;
    yesValue?: boolean | number | string | null;
    noValue?: boolean | number | string | null;
    selectedVal?: boolean | number | string | null;
    onPress?: (selectedVal?: boolean | number | string | null) => void;
    dataSource?: IKeyValueDataSource;
    appearance?: APPEARANCE;
}
const YesNoSwitch: React.FC<IYesNoSwitchProps> = (props: IYesNoSwitchProps): React.ReactElement => {
    const {
        databind,
        onPress,
        yesValue,
        noValue,
        selectedVal,
        yesLabel,
        yesLabelLocalizedID,
        noLabel,
        noLabelLocalizedID,
        dataSource,
        appearance,
        ...radioGroupProps
    } = props;

    const styles = useStyles();

    const { theme } = useTheme();

    const datasourceRows = useDataSource('KeyValueDataSource', dataSource);
    const finaDatasource = datasourceRows?.length === 2 ? datasourceRows as IKeyValueElement[] : [{
        key: yesValue ?? YESNO.YES,
        value: yesLabel ?? 'Yes',
    }, {
        key: noValue ?? YESNO.NO,
        value: noLabel ?? 'No',
    }];

    const finalYesValue = finaDatasource[0].key;
    const finalNoValue = finaDatasource[1].key;

    const finalYesLabel = finaDatasource[0].value as string;
    const finalNoLabel = finaDatasource[1].value as string;

    const { boundValue, updateBoundValue } = useDatabind<boolean | number | string | null>(databind);
    const finalBoundValue = boundValue ?? selectedVal;
    const finalSelectedValue = finalBoundValue === finalYesValue ? YESNO.YES : (finalBoundValue === finalNoValue ? YESNO.NO : null);

    const onChange = useCallback((event: GestureResponderEvent, checked?: boolean | undefined, controlID?: string | number | undefined) => {
        let selectedVal: boolean | number | string | null = null;

        switch (controlID) {
            case YESNO.YES:
                selectedVal = finalYesValue;
                break;
            case YESNO.NO:
                selectedVal = finalNoValue;
                break;
            default:
                selectedVal = null;
        }
        updateBoundValue(selectedVal);
        onPress?.(selectedVal);
    }, [finalNoValue, finalYesValue, onPress, updateBoundValue]);

    const getAppearanceColor = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return theme.colors.secondary;
            case 'SECONDARY':
                return theme.colors.primary;
            default:
                return theme.colors.primary;
        }
    }, [appearance, theme.colors.primary, theme.colors.secondary]);

    const getWrapperAppearanceStyle = useCallback(() => {
        switch (appearance) {
            case 'PRIMARY':
                return styles.wrapperPrimary;
            case 'SECONDARY':
                return styles.wrapperSecondary;
            default:
                return styles.wrapperSecondary;
        }
    }, [appearance, styles.wrapperPrimary, styles.wrapperSecondary]);

    return (
        <RadioGroup
            {...radioGroupProps}
            onPress={onChange}
            values={finalSelectedValue}
            options={[{
                controlID: YESNO.YES,
                label: finalYesLabel,
                labelLocalizedID: yesLabelLocalizedID ?? '', // TODO:
                uncheckedIcon: "thumbs-up",
                checkedIcon: "thumbs-up",
                checkedColor: theme.colors.blue,
                uncheckedColor: theme.colors.blue,
            }, {
                controlID: YESNO.NO,
                label: finalNoLabel,
                labelLocalizedID: noLabelLocalizedID ?? '', // TODO:
                uncheckedIcon: 'thumbs-down',
                checkedIcon: 'thumbs-down',
                checkedColor: theme.colors.red,
                uncheckedColor: theme.colors.red,
            }]}
            getRadioItemProps={(isSelected?: boolean) => {
                return ({
                    wrapperStyle: {
                        ...styles.wrapper,
                        ...(getWrapperAppearanceStyle()),
                        borderColor: isSelected ? getAppearanceColor() : theme.colors.black,
                        borderWidth: 1,
                    },
                    containerStyle: styles.radioContainerStyle,
                    textStyle: {
                        color: isSelected ? getAppearanceColor() : theme.colors.text,
                    }
                });
            }}
            radioGroupRootStyle={styles.radioGroupRootStyle}
        />
    );
};
export default YesNoSwitch;

const useStyles = makeStyles(theme => ({
    radioContainerStyle: {
        flexGrow: 1
    },
    wrapper: {
        padding: theme.spacing.md,
        borderRadius: theme.spacing.lg,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperPrimary: {
        backgroundColor: theme.colors.primary,
    },
    wrapperSecondary: {
        backgroundColor: theme.colors.secondary,
    },
    radioGroupRootStyle: {
        display: 'flex',
        flexDirection: 'row',
    }
}));
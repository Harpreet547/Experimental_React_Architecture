import React, { useCallback, useState } from 'react';
import { Icon, Tooltip, makeStyles, useTheme } from '@rneui/themed';
import { Dimensions, View } from 'react-native';
import Text from '../../Controls/Text/Text';

export interface InfoButtonProps {
    description: string;
    descriptionLocalizedID?: string;
}
const InfoButton: React.FC<InfoButtonProps> = (props: InfoButtonProps): React.ReactElement => {
    const { description, descriptionLocalizedID } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { theme } = useTheme();
    const styles = useStyles();

    const onTooltipOpen = useCallback(() => setIsOpen(true), []);
    const onTooltipClose = useCallback(() => setIsOpen(false), []);

    return (
        <View style={styles.root} >
            <Tooltip
                visible={isOpen}
                onOpen={onTooltipOpen}
                onClose={onTooltipClose}
                containerStyle={styles.popoverContainer}
                width={Dimensions.get('window').width * 0.5}
                height={64}
                popover={(
                    <Text style={styles.desc} label={description} labelLocalizedID={descriptionLocalizedID} />
                )}
            >
                <Icon
                    name='info'
                    color={theme.colors.grey3}
                />
            </Tooltip>
        </View>
    );
};
export default InfoButton;

const useStyles = makeStyles(theme => ({
    root: {
        width: 35,
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,

    },
    popoverContainer: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.primary,
    },
    desc: {
        display: 'flex',
        flexShrink: 1,
        flexGrow: 1,
    }
}));
import React from  'react';
import { Overlay, makeStyles, useTheme } from '@rneui/themed';
import { ActivityIndicator, ColorValue } from 'react-native';

interface ILoadingIndicatorProps {
    isLoading?: boolean;
    color?: ColorValue | undefined;
}
const LoadingIndicator: React.FC<ILoadingIndicatorProps> = (props: ILoadingIndicatorProps): React.ReactElement => {
    const { color, isLoading } = props;

    const styles = useStyles();
    const { theme } = useTheme();

    return (
        <Overlay
            isVisible={isLoading ?? false}
            overlayStyle={styles.overlay}
        >
            <ActivityIndicator
                size='large'
                style={styles.loadingIndicator}
                color={color ?? theme.colors.primary}
            />
        </Overlay>
    );
};
export default LoadingIndicator;


const useStyles = makeStyles((theme) => ({
    loadingIndicator: {
        height: theme.spacing.xl,
        width: theme.spacing.xl,
        backgroundColor: theme.colors.cardBackground,
    },
    overlay: {
        backgroundColor: theme.colors.cardBackground
    }
}));
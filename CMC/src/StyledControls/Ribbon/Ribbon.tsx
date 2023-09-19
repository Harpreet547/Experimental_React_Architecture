import { makeStyles } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

/**
 * 
 * Can only use default text.
 * Don't change text size or height.
 * number of lines should be 1 for text
 * 
 * Child can only be text
 * 
 * @param props 
 * @returns 
 */
const Ribbon: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren): React.ReactElement => {

    const styles = useStyles();

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.root}
            >
                <View
                    style={styles.childContainer}
                >
                    {
                        props.children
                    }
                </View>
                <View
                    style={styles.ribbonEnd}
                />
            </View>
        </View>
    );
};
export default Ribbon;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        height: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: theme.colors.secondary
    },
    childContainer: {
        marginHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
    },
    ribbonEnd: {
        // height: '100%',
        width: 16,
        aspectRatio: 1 / 1,
        backgroundColor: theme.colors.cardBackground,
        transform: [{
            rotateZ: '45deg'
        }],
        left: 8
    }
}));
import React, { useCallback } from 'react';
import {
    ListItem,
    Divider,
    ListItemProps,
} from '@rneui/base';
import { IKeyValueElement } from '@harpreet547/cdh';
import { PressableStateCallbackType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { makeStyles } from '@rneui/themed';

export interface IDropdownListElement extends IKeyValueElement, ListItemProps { }

interface IDropddownListItemProps extends Omit<IDropdownListElement, 'onPress'> {
    controlID: string | number | null;
    onPress?: (key: string | number | null) => void;
    titleStyle?: StyleProp<TextStyle>;
    listItemStyle?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}
const DropdownListItem: React.FC<IDropddownListItemProps> = (props: IDropddownListItemProps): React.ReactElement => {
    const { controlID, value, onPress, listItemStyle, titleStyle, ...listItemProps } = props;

    const styles = useStyles();

    const onClick = useCallback(() => {
        onPress?.(controlID ?? null);
    }, [controlID, onPress]);

    return (
        <>
            <ListItem
                {...listItemProps}
                style={{
                    ...styles.root,
                    ...(listItemStyle as ViewStyle)
                }}
                containerStyle={{
                    ...styles.container,
                }}
                onPress={onClick}
            >
                <ListItem.Content
                    style={{
                        ...styles.content
                    }}
                >
                    <ListItem.Title
                        style={{
                            ...styles.title,
                            ...(titleStyle as TextStyle)
                        }}
                    >
                        {value as string}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <Divider />
        </>
    );
};
export default DropdownListItem;

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.sm,
    },
    container: {
        backgroundColor: theme.colors.background,
    },
    content: {
        backgroundColor: theme.colors.background,
    },
    title: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        width: '100%',
        textAlign: 'center',
    }
}));
import { ThemeProvider as NativeElementThemeProvider } from '@rneui/themed';
import React from 'react';
import { theme } from './Theme';

const ThemeProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {

    return (
        <NativeElementThemeProvider theme={theme}>
            {
                props.children
            }
        </NativeElementThemeProvider>
    );
};
export default ThemeProvider;

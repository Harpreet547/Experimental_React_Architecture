import React, { useCallback } from "react";
import { useThemeMode } from "@rneui/themed";
import RoundedCornerButton from "../StyledControls/Button/RoundedCornerButton";

const useThemeSwitcher = (): React.ReactElement => {

    const { setMode, mode } = useThemeMode();

    const onSwitchTheme = useCallback(() => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    }, [mode, setMode]);

    return (
        <RoundedCornerButton
            label={`Switch ${mode === 'dark' ? 'light' : 'dark'}`}
            onPress={onSwitchTheme}
        />
    );
};
export default useThemeSwitcher;
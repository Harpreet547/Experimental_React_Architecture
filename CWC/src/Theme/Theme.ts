import { createDarkTheme, createLightTheme, themeToTokensObject } from '@fluentui/react-components';

import type { BrandVariants, Theme } from '@fluentui/react-components';

const opa: BrandVariants = {
    10: "#030202",
    20: "#1A1615",
    30: "#2C2321",
    40: "#3A2E2B",
    50: "#493935",
    60: "#584540",
    70: "#68514A",
    80: "#785D56",
    90: "#896A61",
    100: "#9A766D",
    110: "#AC8478",
    120: "#BD9184",
    130: "#CF9E91",
    140: "#E2AC9D",
    150: "#F4BAAA",
    160: "#FFCBBC"
};

const lightTheme: Theme = {
    ...createLightTheme(opa),
};

const darkTheme: Theme = {
    ...createDarkTheme(opa),
};


darkTheme.colorBrandForeground1 = opa[110];
darkTheme.colorBrandForeground2 = opa[120];

export const tokens = themeToTokensObject(lightTheme);

export {
    darkTheme,
    lightTheme,
};
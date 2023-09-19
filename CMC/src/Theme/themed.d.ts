// themed.d.ts
import '@rneui/themed';

declare module '@rneui/themed' {
    export interface Colors {
        tertiary: string;
        cardBackground: string;
        cardBackground2: string;
        cardBackground3: string;
        placeholder: string;
        text: string;
        border: string;
        borderLight: string;

        shadowColor: string;
        
        red: string;
        yellow: string;
        green: string;
        blue: string;
    }
    export interface ThemeSpacing {
        borderWidth: number;
        borderSmall: number;
        fontSize: {
            h1: number;
            h2: number;
            h3: number;
            h4: number;
            h5: number;
            h6: number;
        };
        fontWeight: {
            normal: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
            bold: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
            bolder: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
        };
        shadowOffset: {
            height: number;
            width: number;
        };
        shadowOpacity: number;
    }
}
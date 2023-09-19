import { createTheme } from "@rneui/themed";

export const theme = createTheme({
    lightColors: {
        primary: '#FEEDB8',//'#FCC313',//'#FFC2B1',
        secondary: '#F26A24',//'#D42061', //#ffee93
        tertiary: '#ffe3d8',
        cardBackground: '#FFFFFF',
        cardBackground2: '#FFF6FA',//'#eac4d5',
        cardBackground3: '#FDF8F5',
        background: '#fff5f1',//'#FEE6DD',
        disabled: '#3C3C3C',
        placeholder: '#3C3C3C',
        text: 'black',
        border: 'black',
        borderLight: '#C4C4C4',

        shadowColor: 'black',

        white: 'white',
        red: '#D9423D',
        yellow: '#f1b703',
        green: '#3a6f44',
        blue: '#00C6E8',
        black: 'black',
        error: '#FF9494',

        // FINAL YELLOW
        // primary: '#FCC313',
        // secondary: '#D42061', //#ffee93
        // tertiary: '#ffffff',
        // cardBackground: '#FFFFFF',
        // cardBackground2: '#FFF6FA',//'#eac4d5',
        // cardBackground3: '#FDF8F5',
        // background: '#f9e5ee',//'#f9e9e0',//'#FDF8F5',//'#fffbff',//'#edf2fb',
        // disabled: '#3C3C3C',
        // placeholder: '#3C3C3C',
        // text: 'black',
        // border: 'black',
        // borderLight: '#C4C4C4',

        // shadowColor: 'black',

        // white: 'white',
        // red: '#D9423D',
        // yellow: '#F5BB40',
        // green: '#3a6f44',
        // black: 'black',
        // error: '#FF9494',

        // primary: '#992257',
        // secondary: '#C0FCF8', //#ffee93
        // tertiary: '#ffffff',
        // cardBackground: '#FFF4FA',
        // cardBackground2: '#FFF6FA',//'#eac4d5',
        // cardBackground3: '#F2F2F7',
        // background: '#EFEFDC',//'#fffbff',//'#edf2fb',
        // disabled: '#3C3C3C',
        // placeholder: '#3C3C3C',
        // text: 'black',
        // border: 'black',
        // borderLight: '#C4C4C4',

        // shadowColor: 'black',

        // white: 'white',
        // red: '#D9423D',
        // yellow: '#F5BB40',
        // green: '#3a6f44',
        // black: 'black',
        // error: '#FF9494',

        // primary: '#992257',
        // secondary: '#ffd670', //#ffee93
        // tertiary: '#ffffff',
        // cardBackground: '#FFFFFF',
        // cardBackground2: '#ffe5ec',//'#eac4d5',
        // cardBackground3: '#ffee93',
        // background: '#f9f6f2',//'#fffbff',//'#edf2fb',
        // disabled: '#3C3C3C',
        // placeholder: '#3C3C3C',
        // text: 'black',
        // border: 'black',
        // borderLight: '#C4C4C4',

        // shadowColor: 'black',

        // white: 'white',
        // red: '#D9423D',
        // yellow: '#F5BB40',
        // green: '#3a6f44',
        // black: 'black',
        // error: '#FF9494',

        // primary: '#C23562',
        // secondary: '#F8EAEF',
        // tertiary: '#F8EAEF',
        // cardBackground: '#FFFFFF',
        // cardBackground2: '#FDF8F5',
        // cardBackground3: '#FDF8F5',
        // background: '#FBF4F7',
        // disabled: '#3C3C3C',
        // placeholder: '#3C3C3C',
        // text: 'black',
        // border: 'black',
        // borderLight: '#C4C4C4',

        // shadowColor: 'black',

        // white: 'white',
        // red: '#D9423D',
        // yellow: '#F5BB40',
        // green: '#65AF74',
        // black: 'black',
        // error: '#FF9494',
    },
    darkColors: {
        primary: '#7FF0FB',
        secondary: '#3a4754',
        tertiary: '#335459',
        cardBackground: '#283340',
        cardBackground2: '#3A4856',
        cardBackground3: '#4B7280',
        background: '#1E2124',
        disabled: '#C4C4C4',
        placeholder: '#C4C4C4',
        text: 'white',
        border: '#55EEF8',

        shadowColor: 'black',

        white: 'white',
        red: '#D33A31',
        yellow: '#CBCB7C',
        green: '#C8FDC2',
        black: 'black',
        error: '#FF9494',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 32,
        xl: 64,
        borderWidth: 1,
        borderSmall: 0.5,
        fontSize: {
            h1: 32,
            h2: 28,
            h3: 24,
            h4: 18,
            h5: 14,
            h6: 12
        },
        fontWeight: {
            normal: '400',
            bold: '600',
            bolder: '800',
        },
        shadowOffset: {
            height: 2,
            width: 2,
        },
        shadowOpacity: 0.2,
    },
    mode: 'light',
});
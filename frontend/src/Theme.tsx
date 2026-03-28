import { createTheme } from '@mui/material';
import { lighten, darken } from '@mui/material/styles';

const colors = {
    primary: '#FFFFFF',
    secondary: '#00b4d7',
    error: '#F23901',
    warning: '#EBAD03',
    info: '#F20386',
    success: '#7AEB01',
}

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#030503',
            light: lighten(colors.primary, 0.4),
            dark: darken(colors.primary, 0.4),
            contrastText: '#030503',
        },
        secondary: {
            main: colors.secondary,
            light: lighten(colors.secondary, 0.4),
            dark: darken(colors.secondary, 0.4),
            contrastText: '#000000',
        },
        error: {
            main: colors.error,
            light: lighten(colors.error, 0.4),
            dark: darken(colors.error, 0.4),
            contrastText: '#ffffff',
        },
        warning: {
            main: colors.warning,
            light: lighten(colors.warning, 0.4),
            dark: darken(colors.warning, 0.4),
            contrastText: '#000000',
        },
        info: {
            main: colors.info,
            light: lighten(colors.info, 0.4),
            dark: darken(colors.info, 0.4),
            contrastText: '#ffffff',
        },
        success: {
            main: colors.success,
            light: lighten(colors.success, 0.4),
            dark: darken(colors.success, 0.4),
            contrastText: '#000000',
        },
        background: {
            default: '#2a2a2a',
            paper: '#2a2a2a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cccccc',
        },
    },
    components: {
        MuiTypography: {
        defaultProps: {
            variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'h2',
                subtitle2: 'h2',
            },
        },
        },
    },
})

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#030503',
            light: lighten(colors.primary, 0.4),
            dark: darken(colors.primary, 0.4),
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.secondary,
            light: lighten(colors.secondary, 0.4),
            dark: darken(colors.secondary, 0.4),
            contrastText: '#000000',
        },
        error: {
            main: colors.error,
            light: lighten(colors.error, 0.4),
            dark: darken(colors.error, 0.4),
            contrastText: '#ffffff',
        },
        warning: {
            main: colors.warning,
            light: lighten(colors.warning, 0.4),
            dark: darken(colors.warning, 0.4),
            contrastText: '#000000',
        },
        info: {
            main: colors.info,
            light: lighten(colors.info, 0.4),
            dark: darken(colors.info, 0.4),
            contrastText: '#ffffff',
        },
        success: {
            main: colors.success,
            light: lighten(colors.success, 0.4),
            dark: darken(colors.success, 0.4),
            contrastText: '#000000',
        },
        background: {
            default: '#2a2a2a',
            paper: '#2a2a2a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cccccc',
        },
    },
    components: {
        MuiTypography: {
        defaultProps: {
            variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'h2',
                subtitle2: 'h2',
            },
        },
        },
    },
})

export { lightTheme, darkTheme }
export default lightTheme;
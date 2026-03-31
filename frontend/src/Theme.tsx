import { createTheme } from '@mui/material';
import { lighten, darken } from '@mui/material/styles';

import '@fontsource/doto';
import '@fontsource/cutive-mono';

const colors = {
  white: '#FFFFFF',
  black: '#121212',
  accent: '#407690',
  info: '#e6f51dc9',
  warning: '#f4a317',
  error: '#ea1111',
  success: '#1cda29',
};

const sizes = {
  h1: '1rem',
  h2: '1.5rem',
  h3: '1.25rem',
  h4: '1rem',
  h5: '0.875rem',
  h6: '0.75rem',
  body1: '1rem',
  body2: '0.875rem',
  button: '0.75rem',
  caption: '0.75rem',
  overline: '0.625rem',
  icon: '1.5rem',
};

const fonts = {
  normal: 'sans-serif',
  button: '"Cutive Mono", monospace',
  title: '"Doto", sans-serif',
  currentPage: '"Sedgwick Ave Display", cursive',
};

const lightTheme = createTheme({
  palette: {
    primary: {
      main: colors.white,
      light: lighten(colors.white, 0.4),
      dark: darken(colors.white, 0.4),
      contrastText: colors.black,
    },
    secondary: {
      main: colors.accent,
      light: lighten(colors.accent, 0.4),
      dark: darken(colors.accent, 0.4),
      contrastText: colors.white,
    },
    info: {
      main: colors.info,
      light: lighten(colors.info, 0.4),
      dark: darken(colors.info, 0.4),
      contrastText: colors.black,
    },
    warning: {
      main: colors.warning,
      light: lighten(colors.warning, 0.4),
      dark: darken(colors.warning, 0.4),
      contrastText: colors.black,
    },
    error: {
      main: colors.error,
      light: lighten(colors.error, 0.4),
      dark: darken(colors.error, 0.4),
      contrastText: colors.black,
    },
    success: {
      main: colors.success,
      light: lighten(colors.success, 0.4),
      dark: darken(colors.success, 0.4),
      contrastText: colors.black,
    },
  },
  typography: {
    fontFamily: fonts.normal,
    h1: {
      fontSize: sizes.h1,
      fontFamily: fonts.title,
    },
    h4: {
      fontSize: sizes.h4,
      fontFamily: fonts.title,
      fontWeight: 600,
    },
    h5: {
      fontSize: sizes.h5,
      fontFamily: fonts.title,
      fontWeight: 600,
    },
    h6: {
      fontSize: sizes.h6,
      fontFamily: fonts.currentPage,
      fontWeight: 600,
    },
    button: {
      fontSize: sizes.button,
      fontFamily: fonts.button,
      fontWeight: 400,
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
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: colors.black,
      light: lighten(colors.black, 0.4),
      dark: darken(colors.black, 0.4),
      contrastText: colors.white,
    },
    secondary: {
      main: colors.accent,
      light: lighten(colors.accent, 0.4),
      dark: darken(colors.accent, 0.4),
      contrastText: colors.white,
    },
    info: {
      main: colors.info,
      light: lighten(colors.info, 0.4),
      dark: darken(colors.info, 0.4),
      contrastText: colors.white,
    },
    warning: {
      main: colors.warning,
      light: lighten(colors.warning, 0.4),
      dark: darken(colors.warning, 0.4),
      contrastText: colors.white,
    },
    error: {
      main: colors.error,
      light: lighten(colors.error, 0.4),
      dark: darken(colors.error, 0.4),
      contrastText: colors.white,
    },
    success: {
      main: colors.success,
      light: lighten(colors.success, 0.4),
      dark: darken(colors.success, 0.4),
      contrastText: colors.white,
    },
  },
  typography: {
    fontFamily: fonts.normal,
    h1: {
      fontSize: sizes.h1,
      fontFamily: fonts.title,
      fontWeight: 600,
    },
    h4: {
      fontSize: sizes.h4,
      fontFamily: fonts.title,
      fontWeight: 600,
    },
    h5: {
      fontSize: sizes.h5,
      fontFamily: fonts.title,
      fontWeight: 600,
    },
    h6: {
      fontSize: sizes.h6,
      fontFamily: fonts.currentPage,
      fontWeight: 600,
    },
    button: {
      fontSize: sizes.button,
      fontFamily: fonts.button,
      fontWeight: 400,
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
});

export { lightTheme, darkTheme };
export default lightTheme;

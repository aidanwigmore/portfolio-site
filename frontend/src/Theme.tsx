import { createTheme } from '@mui/material';

export default (
    createTheme({
        palette: {
            primary: {
                main: '#1976d2',
                light: '#42a5f5',
                dark: '#1565c0',
                contrastText: '#fff',
            },
            secondary: {
                main: '#dc004e',
                light: '#f73378',
                dark: '#9a0036',
                contrastText: '#fff',
            },
            background: {
                default: '#fafafa',
                paper: '#fff',
            },
            text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.60)',
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
)
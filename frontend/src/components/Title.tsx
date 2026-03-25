import React from 'react';

import Box from '@mui/material/Box';

import Theme from '@/Theme';
import { CustomTypography } from '@/materials/Typography';

interface TitleProps {
    children? : React.ReactNode;
    color? : string;
    variant?: boolean;
}

function Title({ children, variant } : TitleProps) {
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 0,
            marginRight: 0,
            padding: '2vw',
            backgroundColor: Theme.palette.primary.light, 
            borderRadius: '8px',
        }}>
            <Box sx={{
                // backgroundColor: Theme.palette.secondary.light,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: variant!==true ? "" : "'0 8px 32px rgba(0, 0, 0, 0.1)'"
            }}>
            <CustomTypography variant={variant!==true ? "h3" : "h6"} color={Theme.palette.primary.contrastText} textAlign="center" gutterBottom>
                {children}
            </CustomTypography>
            </Box>
        </Box>
    );
}

export default Title;

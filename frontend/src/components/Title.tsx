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
            backgroundColor: Theme.palette.secondary.light,
        }}>
            <Box sx={{
            }}>
            <CustomTypography variant={variant!==true ? "h2" : "caption"} color={Theme.palette.primary.contrastText} textAlign="center" gutterBottom>
                {children}
            </CustomTypography>
            </Box>
        </Box>
    );
}

export default Title;

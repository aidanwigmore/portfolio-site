import React from 'react';

import Box from '@mui/material/Box';

import Theme from '@/Theme';
import { CustomTypography } from '@/materials/Typography';

interface TitleProps {
    children? : React.ReactNode;
    color? : string;
}

function Title({ children } : TitleProps) {
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            margin: '1vh',
            marginLeft: 0,
            marginRight: 0,
            padding: '2vw',
            backgroundColor: Theme.palette.primary.light, 
            borderRadius: '8px',
            marginBottom: '-3vh',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}>
            <Box sx={{
                padding: '2vw',
                paddingBottom: '1vw',
                // backgroundColor: Theme.palette.secondary.light,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}>
            <CustomTypography variant="h3" color={Theme.palette.primary.contrastText} textAlign="center" gutterBottom>
                {children}
            </CustomTypography>
            </Box>
        </Box>
    );
}

export default Title;

import React from 'react';

import Box from '@mui/material/Box';
import Theme from '../Theme';
import { CustomTypography } from '../materials/Typography';
interface TitleProps {
    children? : React.ReactNode;
    color? : string;
}

function Title({ children, color } : TitleProps) {
    return (
        <>
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center',
                margin: '1vh',
                marginLeft: 0,
                marginRight: 0,
                padding: '2vw',
                backgroundColor: Theme.palette.secondary.light, 
                borderRadius: '8px',
                marginBottom: '-3vh',
            }}>
                <Box sx={{
                padding: '2vw',
                paddingBottom: '1vw',
                backgroundColor: Theme.palette.secondary.main,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <CustomTypography variant="h2" color={Theme.palette.secondary.contrastText} textAlign="center" gutterBottom>
                    {children}
                </CustomTypography>
                </Box>
            </Box>
        </>
    );
}

export default Title;

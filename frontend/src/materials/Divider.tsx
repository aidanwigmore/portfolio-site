import { Divider, DividerProps } from '@mui/material';
import React from 'react';

import Box from '@mui/material/Box';

import Theme from '@/Theme';

interface CustomDividerProps extends DividerProps {
    gutterBottom?: boolean;
    gutterTop?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    thickness?: number;
}

export const CustomDivider: React.FC<CustomDividerProps> = ({
    gutterBottom = false,
    gutterTop = false,
    color = 'secondary',
    thickness = 3,
    sx = {},
    ...props
}) => {
    return (
        <Box display='flex' flexDirection='row' justifyContent='center'>
            <Divider
                sx={{
                    borderColor: Theme.palette[color].main,
                    borderWidth: thickness,
                    borderRadius: `8px`,
                    width: '50%',
                    ...(gutterTop && { marginTop: '1rem' }),
                    ...(gutterBottom && { marginBottom: '1rem' }),
                    ...sx,
                }}
                {...props}
            >
            </Divider>
        </Box>
        
    );
};
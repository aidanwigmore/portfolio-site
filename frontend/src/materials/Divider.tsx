import { Divider, DividerProps } from '@mui/material';
import React from 'react';

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
    color = Theme.palette.secondary,
    thickness = 3,
    sx = {},
    ...props
}) => {
    return (
        <Divider
            sx={{
                borderColor: `${color}.main`,
                borderWidth: thickness,
                borderRadius: `8px`,
                ...(gutterTop && { marginTop: '1rem' }),
                ...(gutterBottom && { marginBottom: '1rem' }),
                ...sx,
            }}
            {...props}
        >
        </Divider>
    );
};
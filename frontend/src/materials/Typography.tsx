import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

import Theme from '@/Theme';

interface CustomTypographyProps extends TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline';
    children: React.ReactNode;
    gutterBottom?: boolean;
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({
    variant = 'body1',
    children,
    gutterBottom = false,
    sx = {},
    ...props
}) => {
    const isInlineVariant = variant === 'button' || variant === 'caption' || variant === 'overline';

    return (
        <Typography
            variant={variant}
            gutterBottom={gutterBottom}
            sx={{
                color: Theme.palette.secondary.main,
                ...(isInlineVariant && { display: 'block' }),
                ...sx,
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};
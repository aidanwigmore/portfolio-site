import { Button, ButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

import Theme from '@/Theme';

interface CustomButtonProps extends ButtonProps {
    variant?: 'text' | 'outlined' | 'contained';
    children: React.ReactNode;
    gutterBottom?: boolean;
    to?: string;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    (
        {
            variant = 'contained',
            children,
            gutterBottom = false,
            to,
            sx = {},
            ...props
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                component={to ? RouterLink : 'button'}
                to={to}
                variant={variant}
                sx={{
                    display: 'inline-block',
                    width: 'auto',
                    padding: '8px 16px',
                    ...(gutterBottom && { marginBottom: '1rem' }),
                    ...sx,
                    '&:hover': {
                        backgroundColor: Theme.palette.primary.light,
                        color: Theme.palette.primary.contrastText,
                    },
                }}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

CustomButton.displayName = 'CustomButton';
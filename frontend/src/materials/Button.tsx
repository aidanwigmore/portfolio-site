import { Button, ButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useTheme } from '@mui/material/styles';

interface CustomButtonProps extends ButtonProps {
    variant?: 'text' | 'outlined' | 'contained';
    children: React.ReactNode;
    gutterBottom?: boolean;
    to?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
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
        const theme = useTheme();

        return (
            <Button
                ref={ref}
                component={to ? RouterLink : 'button'}
                to={to}
                variant={variant}
                sx={{
                    display: 'inline-block',
                    width: 'auto',
                    maxWidth: '200px',
                    padding: '8px 16px',
                    textWrap: 'nowrap',
                    backgroundColor: theme.palette.primary.contrastText,
                    color: theme.palette.primary.main,
                    boxShadow: `0 4px 16px ${theme.palette.primary.contrastText}`,
                    ...(gutterBottom && { marginBottom: '1rem' }),
                    ...sx,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.primary.contrastText,
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

export default CustomButton;
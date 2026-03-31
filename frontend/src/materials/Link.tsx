import * as React from 'react';

import { Box, Link } from '@mui/material';

interface CustomLinkProps {
    onClick?: (event: React.SyntheticEvent) => void;
    children?: React.ReactNode;
    href?: string;
}

function CustomLink({ children, onClick, href }: CustomLinkProps) {
    const handleClick = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const userConfirmed = window.confirm('Open this link in a new tab?');

        if (userConfirmed && href) {
            window.open(href, '_blank');
        }

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <>
            <Box
                sx={{
                    typography: 'body1',
                    '& > :not(style) ~ :not(style)': {
                        ml: 2,
                    },
                }}
            >
                <Link href="#" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                    {children}
                </Link>
            </Box>
        </>
    );
}

export default CustomLink;

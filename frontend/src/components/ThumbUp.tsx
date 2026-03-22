import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
 
import Theme from "../Theme";

interface ThumbUpProps {
    children?: React.ReactNode;
    index: number;
    ratingCode: string;
    count: number;
    onThumbsUp: (ratingCode: string) => void;
}

function ThumbUp({ children, index, ratingCode, count, onThumbsUp }: ThumbUpProps) {
    return (
        <Box 
            key={`thumb-up-box-${index}`}
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                margin: '1rem' 
            }}
        >
            <IconButton 
                onClick={() => onThumbsUp(ratingCode)}
                size="large"
                sx={{
                    color: Theme.palette.secondary.dark, 
                    backgroundColor: Theme.palette.secondary.main
                }}
            >
                <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2">
                {count || 0}
            </Typography>
        </Box>
    );
}

export default ThumbUp;
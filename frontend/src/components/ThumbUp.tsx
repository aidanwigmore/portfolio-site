import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import CustomTooltip from '@/materials/Tooltip'; 

import Theme from '@/Theme';

interface ThumbUpProps {
    children?: React.ReactNode;
    index: number;
    name: string;
    ratingCode: string;
    onThumbsUp: (ratingCode: string) => void;
}

function ThumbUp({ index, name, ratingCode, onThumbsUp }: ThumbUpProps) {
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
            <CustomTooltip text={`Thumb Up ${name}`}>
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
                {/* <CustomTypography variant="subtitle1" sx={{textAlign: 'center'}}>
                    {count || 0}
                </CustomTypography> */}
            </CustomTooltip>
            
        </Box>
    );
}

export default ThumbUp;
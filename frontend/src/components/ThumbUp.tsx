import React from 'react';

import IconButton from '@mui/material/IconButton';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import CustomTooltip from '@/materials/Tooltip'; 

import { useTheme } from '@mui/material/styles';

interface ThumbUpProps {
    children?: React.ReactNode;
    index: number;
    name: string;
    ratingCode: string;
    onThumbsUp: (ratingCode: string) => void;
}

function ThumbUp({ index, name, ratingCode, onThumbsUp }: ThumbUpProps) {
    const theme = useTheme();
    
    return (
        <CustomTooltip text={name ? `Thumb Up ${name.slice(0, name.length - 1)}?` : 'Thumb Up?'} placement='left'>
            <IconButton
                key={`thumb-up-box-${index}`}
                onClick={() => onThumbsUp(ratingCode)}
                size="large"
                sx={{
                    transition: 'all 0.3s ease',
                    backgroundColor: theme.palette.secondary.light,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                    },
                    '&:hover svg path': {
                        fill: theme.palette.primary.main,
                        transition: 'fill 0.3s ease',
                    },
                    '&:hover svg path:nth-of-type(2)': {
                        fill: theme.palette.secondary.contrastText,
                        transition: 'fill 0.3s ease',
                    },
                }}
            >
                <ThumbUpTwoToneIcon 
                    sx={{
                        '& path': {
                            fill: theme.palette.primary.main,
                            transition: 'fill 0.3s ease',
                        },
                        '& path:nth-of-type(2)': {
                            fill: theme.palette.secondary.main,
                            transition: 'fill 0.3s ease',
                        },  
                    }}
                />
            </IconButton>
        </CustomTooltip>
    );
}

export default ThumbUp;
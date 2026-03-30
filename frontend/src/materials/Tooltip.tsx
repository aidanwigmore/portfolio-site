import React from 'react';

import Tooltip from '@mui/material/Tooltip';

import { useTheme } from '@mui/material/styles';

interface CustomTooltipProps {
    id?: string;
    key?: string;
    text: string;
    children? : React.ReactNode;
    placement: any;
}

function CustomTooltip({ text, children, placement, id, key } : CustomTooltipProps) {    
    const theme = useTheme();

    return (
        <>
            <Tooltip
                id={`${id}-material-tooltip`}
                key={`${key}-material-tooltip`}
                slotProps={{
                    popper: {
                        sx: {
                            '& .MuiTooltip-tooltip': {
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.primary.contrastText,
                            },
                        }
                    }
                }} 
                title={text} 
                arrow 
                placement={placement}
            >
                <span>
                    {children || 'Hover me'}
                </span>
            </Tooltip>
        </>
    );
}

export default CustomTooltip;

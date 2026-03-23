import React from 'react';

import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';

import Theme from '@/Theme';

interface CustomTooltipProps {
    text: string;
    children? : React.ReactNode;
    placement?: TooltipProps['placement'];
}

function CustomTooltip({ text, children, placement, } : CustomTooltipProps) {
    return (
        <>
            <Tooltip slotProps={{
                popper: {
                    sx: {
                        '& .MuiTooltip-tooltip': {
                            backgroundColor: Theme.palette.primary.light,
                            color: Theme.palette.primary.contrastText,
                        },
                    }
                }
            }} title={text} arrow placement={placement ?? 'bottom'}>
                <span>
                    {children || 'Hover me'}
                </span>
            </Tooltip>
        </>
    );
}

export default CustomTooltip;

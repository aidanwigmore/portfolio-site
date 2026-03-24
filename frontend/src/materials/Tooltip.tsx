import React from 'react';

import Tooltip from '@mui/material/Tooltip';

import Theme from '@/Theme';

interface CustomTooltipProps {
    text: string;
    children? : React.ReactNode;
    placement: any;
}

function CustomTooltip({ text, children, placement} : CustomTooltipProps) {
    return (
        <>
            <Tooltip slotProps={{
                popper: {
                    sx: {
                        '& .MuiTooltip-tooltip': {
                            backgroundColor: Theme.palette.secondary.light,
                            color: Theme.palette.secondary.contrastText,
                        },
                    }
                }
            }} title={text} arrow placement={placement}>
                <span>
                    {children || 'Hover me'}
                </span>
            </Tooltip>
        </>
    );
}

export default CustomTooltip;

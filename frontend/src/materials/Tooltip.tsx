import React from 'react';

import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';

interface CustomTooltipProps {
    text: string;
    children? : React.ReactNode;
    placement?: TooltipProps['placement'];
}

function CustomTooltip({ text, children, placement } : CustomTooltipProps) {
    return (
        <>
            <Tooltip title={text} arrow placement={placement ?? 'bottom'}>
                <span>
                    {children || 'Hover me'}
                </span>
            </Tooltip>
        </>
    );
}

export default CustomTooltip;

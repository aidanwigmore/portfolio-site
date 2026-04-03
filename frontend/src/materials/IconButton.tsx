import { IconButton, IconButtonProps } from '@mui/material';
import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import CustomTooltip from '@/materials/Tooltip';

interface CustomIconButtonProps extends IconButtonProps {
    actionText: string;
    name: string;
    onAction: (ratingCode: string) => void;
    ratingCode: string,
    icon: React.ReactNode;
    placement: string;
}

function CustomIconButton({ name, actionText, onAction, ratingCode, icon, placement } : CustomIconButtonProps) {
    const theme = useTheme();
    
    return (
            <CustomTooltip
                text={`${actionText} ${name}?`}
                placement={placement}
            >
                <Box
                    sx={{
                        '&:hover svg path': {
                            fill: theme.palette.primary.contrastText,
                        },
                        '&:hover svg path:nth-of-type(2)': {
                            fill: theme.palette.primary.main,
                        },
                    }}
                >
                <IconButton 
                    onClick={() => onAction(ratingCode)}
                    size="large"
                    sx={{
                        transition: 'all 0.3s ease',
                        backgroundColor: theme.palette.secondary.light,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                        },
                        '&:hover svg path': {
                            fill: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            transition: 'fill 0.3s ease',
                        },
                        '&:hover svg path:nth-of-type(2)': {
                            fill: theme.palette.secondary.contrastText,
                            transition: 'fill 0.3s ease',
                        },
                    }}
                    >
                        {icon}
                    </IconButton>
            </Box>
            </CustomTooltip>
        )
}
        
export default CustomIconButton;

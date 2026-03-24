import { IconButton, IconButtonProps } from '@mui/material';
import Box from '@mui/material/Box';

import Theme from '@/Theme';
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
    return (
            <CustomTooltip
                text={`${actionText} ${name}?`}
                placement={placement}
            >
                <Box
                    sx={{
                        '&:hover svg path': {
                            fill: Theme.palette.secondary.main,
                        },
                        '&:hover svg path:nth-of-type(2)': {
                            fill: Theme.palette.secondary.dark,
                        },
                    }}
                >
                <IconButton 
                    onClick={() => onAction(ratingCode)}
                    size="large"
                    sx={{
                        transition: 'all 0.3s ease',
                        backgroundColor: Theme.palette.secondary.light,
                        '&:hover': {
                            backgroundColor: Theme.palette.secondary.main,
                        },
                        '&:hover svg path': {
                            fill: Theme.palette.primary.main,
                            color: Theme.palette.primary.main,
                            transition: 'fill 0.3s ease',
                        },
                        '&:hover svg path:nth-of-type(2)': {
                            fill: Theme.palette.secondary.contrastText,
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

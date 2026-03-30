import React from 'react';

import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface CustomMotionBoxProps {
    children? : React.ReactNode;
    id?: string;
    sx?: React.CSSProperties;
}

function CustomMotionBox({ children, id, sx } : CustomMotionBoxProps) {
    const theme = useTheme();
    
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8 }
        },
        exit: { opacity: 0, y: 50 }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariants}
            style={{ 
                borderRadius: '8px',
                boxShadow: `0 8px 32px ${theme.palette.primary.main}`,
                margin: '1rem 0',
                ...sx
            }}
            id={id}
        >
            { children }
        </motion.div>
    );
}

export default CustomMotionBox;

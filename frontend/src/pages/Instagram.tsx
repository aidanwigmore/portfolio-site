import React from 'react';
import { Box } from '@mui/material';

interface InstagramProps {
    children? : React.ReactNode;
}

function Instagram({ children } : InstagramProps) {
    
    const posts = [
        'https://www.instagram.com/p/DMF4LzvMNHO/embed',
        'https://www.instagram.com/reel/DNGfH0Bu2BJ/embed',
        'https://www.instagram.com/p/DL7ityFuhke/embed',
        'https://www.instagram.com/reel/DBg-et9xCmK/embed',
        'https://www.instagram.com/p/C4vDvANurhc/embed',
        'https://www.instagram.com/p/CR9KX3SLvvj/embed',
    ];
    
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            gap: "2rem",
            padding: "2rem",
            justifyItems: "center"
        }}>
            {posts.map((src, index) => (
                <iframe 
                    key={index}
                    src={src}
                    width="400" 
                    height="500"
                    scrolling="no"
                    style={{
                        borderRadius: '8px',
                        border: 'none',
                        maxWidth: '100%'
                    }}
                />
            ))}
        </Box>
    );
}

export default Instagram;
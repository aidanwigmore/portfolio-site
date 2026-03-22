import { Box, CircularProgress, Grid } from '@mui/material';
import Title from '@/components/Title';
import Theme from "@/Theme";
import FilmRoutes from '@/data/FilmRoutes';

export default function FilmGallery() {
  // Extract the posts from the object
  const posts = Object.values(FilmRoutes[0]).map(postId => 
    `https://www.instagram.com${postId}/embed`
  );

  return (
    <Box sx={{ p: 3, backgroundColor: Theme.palette.primary.light, borderRadius: '8px' }}>
      <Title children={`35mm Film Gallery`}/>

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
    </Box>
  );
}
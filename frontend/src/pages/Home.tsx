import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { getImagesByCategory, getImageUrl } from '@/api/galleryService';

import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleryIndex';

import { PortfolioImage } from '@/types/Gallery';

import MotionBox from '@/materials/MotionBox';

import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  const [homeImages, setHomeImages] = useState<PortfolioImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchVisitorImages = async () => {
      try {
        const response = await getImagesByCategory('visitors');
        setHomeImages(response.data);
      } catch {
        setHomeImages([]);
      }
    };

    fetchVisitorImages();
  }, []);

  useEffect(() => {
    if (homeImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % homeImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [homeImages.length]);

  const currentImage = homeImages[currentImageIndex];
  const hasImages = homeImages.length > 0;

  useEffect(() => {
    if (currentImageIndex >= homeImages.length) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, homeImages.length]);

  return (
    <>
      <MotionBox
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '8px',
          }}
        >
          {hasImages && currentImage ? (
            <img
              src={getImageUrl(currentImage.image)}
              alt={currentImage.name || 'Homepage Slideshow'}
              style={{
                width: '50vw',
                borderRadius: '8px',
                boxShadow: `0 8px 32px ${theme.palette.primary.contrastText}`,
                backgroundColor: theme.palette.primary.main,
              }}
            />
          ) : (
            <img
              src="/home_images/first_image.png"
              alt="Homepage Slideshow"
              style={{
                width: '50vw',
                borderRadius: '8px',
                boxShadow: `0 8px 32px ${theme.palette.secondary.contrastText}`,
                backgroundColor: theme.palette.secondary.main,
              }}
            />
          )}
        </Box>
      </MotionBox>

      <MotionBox>
        <Projects home={true} />
      </MotionBox>

      <MotionBox>
        <Videos home={true} />
      </MotionBox>

      <MotionBox>
        <InstagramGalleries home={true} />
      </MotionBox>
    </>
  );
}

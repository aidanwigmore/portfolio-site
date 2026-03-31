import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { getImagesByCategory, getImageUrl } from '@/api/galleryService';

import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleryIndex';

import { PortfolioImage } from '@/types/Gallery';

import { CustomTypography } from '@/materials/Typography';

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
            position: 'relative',
          }}
        >
          {hasImages && currentImage ? (
            <>
              <img
                src={getImageUrl(currentImage.image)}
                alt={currentImage.name || 'Homepage Slideshow'}
                style={{
                  width: '50vw',
                  borderRadius: '8px',
                  boxShadow: `0 8px 32px ${theme.palette.primary.contrastText}`,
                  backgroundColor: theme.palette.primary.main,
                  display: 'block',
                }}
              />
              {/* Tags overlay */}
              {currentImage.tags && currentImage.tags.length > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {currentImage.tags
                    .sort((a, b) => a.name.length - b.name.length)
                    .map((tag, index) => (
                      <Chip
                        key={`${tag.name}-${index}`}
                        label={
                          <CustomTypography
                            variant="button"
                            color={theme.palette.primary.main}
                          >
                            {tag.name}
                          </CustomTypography>
                        }
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.primary.contrastText,
                          color: theme.palette.primary.main,
                        }}
                      />
                    ))}
                </Box>
              )}
            </>
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

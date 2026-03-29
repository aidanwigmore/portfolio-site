import { useState, useEffect } from 'react';

import Videos from '@/pages/Videos/Videos';
import Projects from '@/pages/Projects/Projects';
import { motion } from 'framer-motion';

import InstagramGalleries from '@/pages/Gallery/InstagramGalleries';

import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { getImagesByCategory, getImageUrl } from '@/api/galleryService';
import { PortfolioImage } from '@/types/Gallery';

export default function Home() {
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

  const contentVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, delay: 0.2 }
    },
    exit: { opacity: 0, y: 100 }
  };

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
      <Box
        sx={{
          backgroundColor: theme.palette.primary.contrastText,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
        style={{ 
          borderRadius: '8px',
          boxShadow: `0 8px 32px ${theme.palette.primary.main}`, }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'center',
          gap: 2,
        }}>
          <Box id={'image_slideshow'} sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box id={'image'} sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '8px',
              p: 2,
            }}>
              {hasImages && currentImage ? (
                <img src={getImageUrl(currentImage.image)} alt={currentImage.name || "Homepage Slideshow"} style={{ 
                  width: '50vw', 
                  borderRadius: '8px', 
                  boxShadow: `0 8px 32px ${theme.palette.primary.contrastText}`,
                }} />
              ) : (
                <img src="/home_images/first_image.png" alt="Homepage Slideshow" style={{ 
                  width: '50vw',
                  borderRadius: '8px',
                  boxShadow: `0 8px 32px ${theme.palette.primary.contrastText}`,
              }} />
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
              
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
        style={{ 
          borderRadius: '8px',
          boxShadow: `0 8px 32px ${theme.palette.primary.main}`,
          marginTop: '10vh',
        }}
      >
        <Projects home={true}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
        variants={contentVariants}
        style={{ 
          borderRadius: '8px',
          boxShadow: `0 8px 32px ${theme.palette.primary.main}`,
          marginTop: '10vh',
        }}
      >
        <Videos home={true}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
        variants={contentVariants}
        style={{ 
          borderRadius: '8px',
          boxShadow: `0 8px 32px ${theme.palette.primary.main}`,
          marginTop: '10vh',
        }}
      >
        <InstagramGalleries home={true}/>
      </motion.div>
    </Box>
  );
}
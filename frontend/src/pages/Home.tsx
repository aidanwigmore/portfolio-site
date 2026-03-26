import { useState, useEffect } from 'react';

import Videos from '@/pages/Videos/Videos';
import Projects from '@/pages/Projects/Projects';
import { motion } from 'framer-motion';

// import InstagramGallery from '@/pages/Gallery/InstagramGallery';
import InstagramGalleries from '@/pages/Gallery/InstagramGalleries';
import Title from '@/components/Title';

// import MRKTRoutes from '@/data/MrktRoutes';
// import FilmRoutes from '@/data/FilmRoutes';
// import DigitalRoutes from '@/data/DigitalRoutes';

import { CustomTypography } from '@/materials/Typography';
import Theme from '@/Theme';

import Box from '@mui/material/Box';
import { getImagesByCategory, getImageUrl } from '@/api/galleryService';
import { PortfolioImage } from '@/types/Gallery';

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, delay: 0.2 }
    }
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
    <>
      <Box
        sx={{
          backgroundColor: Theme.palette.secondary.light,
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2vh',
        }}
      >
        <Title children={
          <>
            Aidan Wigmore
            <CustomTypography children={"Full stack web developer with a passion for mixing technology and creativity."}/>
          </>
        }
        />
            
      </Box>
      <motion.div
        initial="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'center',
          backgroundColor: Theme.palette.secondary.light,
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          p: 4,
          gap: 2,
        }}>
        
          <Box id={'image_slideshow'} sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box id={'image'} sx={{
              backgroundColor: Theme.palette.primary.light,
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              p: 2,
            }}>
              {hasImages && currentImage ? (
                <img src={getImageUrl(currentImage.image)} alt={currentImage.name || "Homepage Slideshow"} style={{ 
                  height: '80vh', 
                  borderRadius: '8px', 
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' 
                }} />
              ) : (
                <img src="/home_images/first_image.png" alt="Homepage Slideshow" style={{ 
                height: '80vh',
                borderRadius: '8px', 
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' 
              }} />
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
              
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Projects home={true}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <Videos home={true}/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <InstagramGalleries/>
      </motion.div>
    </>
  );
}
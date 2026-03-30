import { Routes, Route, useLocation } from "react-router-dom";

import Home from '@/pages/Home';
import Videos from '@/pages/Videos/VideosIndex';
import Projects from '@/pages/Projects/ProjectsIndex';
import ImageGallery from '@/pages/Gallery/ImageGallery';

import Navbar from '@/components/Navbar';

import { PageTransition } from "@/components/PageTransition"
import { AnimatePresence } from 'framer-motion';

import InstagramGallery from '@/pages/Gallery/InstagramGallery';
import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';
import Box from "@mui/material/Box";

import { useTheme } from '@mui/material/styles';

interface RouterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function Router({ isDarkMode, toggleTheme }: RouterProps) {
  
  const location = useLocation();
    const theme = useTheme();
  

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.contrastText,
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Home />
              </Box>
            </PageTransition>
          } />
          <Route path="/videos" element={
            <PageTransition>
              <Videos />
            </PageTransition>
          } />
          <Route path="/projects" element={
            <PageTransition>
              <Projects />
            </PageTransition>
          } />
          <Route path="/gallery" element={
            <PageTransition>
              <ImageGallery />
            </PageTransition>
          } />
          <Route path="/mrkt-media" element={
            <PageTransition>
              <Box 
                  sx={{ 
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    backgroundColor: theme.palette.secondary.main,
                  }}
              >
                <InstagramGallery color={theme.palette.primary.main} title={'MRKTBox Memories'} routes={MRKTRoutes}/>
              </Box>
            </PageTransition>
          } />
          <Route path="/film-media" element={
            <PageTransition>
              <Box 
                  sx={{ 
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    backgroundColor: theme.palette.secondary.main,
                    p: 3,
                  }}
              >
                <InstagramGallery title={'Film Media'} routes={FilmRoutes}/>
              </Box>
            </PageTransition>
          } />
          <Route path="/digi-media" element={
            <PageTransition>
              <Box 
                  sx={{ 
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    backgroundColor: theme.palette.secondary.main,
                    p: 3,
                  }}
              >
                <InstagramGallery title={'Digital Media'} routes={DigitalRoutes}/>
              </Box>
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default Router;
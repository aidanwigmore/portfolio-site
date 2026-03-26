import { Routes, Route, useLocation } from "react-router-dom";

import Home from '@/pages/Home';
import Videos from '@/pages/Videos/Videos';
import Projects from '@/pages/Projects/Projects';
import ImageGallery from '@/pages/Gallery/ImageGallery';

import Navbar from '@/components/Navbar';

import { PageTransition } from "@/components/PageTransition"
import { AnimatePresence } from 'framer-motion';

import InstagramGallery from '@/pages/Gallery/InstagramGallery';
import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';
import Box from "@mui/material/Box";

import Theme from '@/Theme';

function Router() {
  
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
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
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backgroundColor: Theme.palette.secondary.light,
                    p: 3,
                  }}
              >
                <InstagramGallery title={'MRKTBox Appearances'} routes={MRKTRoutes}/>
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
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backgroundColor: Theme.palette.secondary.light,
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
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backgroundColor: Theme.palette.secondary.light,
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
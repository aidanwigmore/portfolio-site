import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Videos from "./pages/Videos/Videos";
import Projects from "./pages/Projects/Projects";
import ImageGallery from "./pages/Gallery/ImageGallery";
import FilmGallery from "./pages/Gallery/FilmGallery";

import Navbar from "./components/Navbar";

import { PageTransition } from "./components/PageTransition"
import { AnimatePresence } from 'framer-motion';

import InstagramGallery from './pages/Gallery/InstagramGallery';
import MRKTRoutes from './data/embeddedRoutes/MrktRoutes';
import FilmRoutes from './data/embeddedRoutes/FilmRoutes';
import DigitalRoutes from './data/embeddedRoutes/DigitalRoutes';

export default function Router() {
  
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
              <InstagramGallery title={'MRKTBox Media'} routes={MRKTRoutes} />
            </PageTransition>
          } />
          <Route path="/film-media" element={
            <PageTransition>
              <InstagramGallery title={'Film Media'} routes={FilmRoutes} />
            </PageTransition>
          } />
          <Route path="/digi-media" element={
            <PageTransition>
              <InstagramGallery title={'Digital Media'} routes={DigitalRoutes} />
            </PageTransition>
          } />
        
        </Routes>
      </AnimatePresence>
    </>
  );
}
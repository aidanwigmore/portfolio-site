import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "@/Pages/Home";
import Videos from "@/Pages/Videos/Videos";
import Projects from "@/Pages/Projects/Projects";
import ImageGallery from "@/Pages/Gallery/ImageGallery";
import FilmGallery from "@/Pages/Gallery/FilmGallery";

import Navbar from "@/components/Navbar";

import { PageTransition } from "@/components/PageTransition"
import { AnimatePresence } from 'framer-motion';

import InstagramGallery from '@/Pages/Gallery/InstagramGallery';
import MRKTRoutes from './data/MrktRoutes';
import FilmRoutes from './data/FilmRoutes';
import DigitalRoutes from './data/DigitalRoutes';

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
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Videos from "./pages/Videos/Videos";
import Projects from "./pages/Projects/Projects";
import ImageGallery from "./pages/Gallery/ImageGallery";
import FilmGallery from "./pages/Gallery/FilmGallery"

import Navbar from "./components/Navbar";

import { PageTransition } from "./components/PageTransition"
import { AnimatePresence } from 'framer-motion';

import Instagram from './pages/Instagram';

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
          <Route path="/instagram" element={
            <PageTransition>
              <Instagram />
            </PageTransition>
          } />
          <Route path="/film-gallery" element={
            <PageTransition>
              <FilmGallery />
            </PageTransition>
          } />
        
        </Routes>
      </AnimatePresence>
    </>
  );
}
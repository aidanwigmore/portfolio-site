import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Videos from "./pages/Videos/Videos";
import Projects from "./pages/Projects/Projects";

import Navbar from "./components/Navbar";

import { PageTransition } from "./components/PageTransition"
import { AnimatePresence } from 'framer-motion';

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
        
        </Routes>
      </AnimatePresence>
    </>
  );
}
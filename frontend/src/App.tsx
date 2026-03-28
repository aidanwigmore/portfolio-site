import { useCallback } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { lightTheme, darkTheme } from '@/Theme';

import Router from '@/Router';
// import Theme from '@/Theme';

import { useState, useEffect } from 'react';

import { ThemeProvider } from '@mui/material';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  }, []);

  
  return (
    <ThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
      <Router isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
    </ThemeProvider>
  )
}

export default App;
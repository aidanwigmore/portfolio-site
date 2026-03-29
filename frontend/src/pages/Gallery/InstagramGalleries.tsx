import React, { useState } from 'react';

import { 
  Box, 
  Tab,
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import InstagramGallery from '@/pages/Gallery/InstagramGallery';

import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';

import Title from '@/components/Title';

import { useTheme } from '@mui/material/styles';

interface InstagramGalleriesProps {
  children? : React.ReactNode;
  home?: boolean;
}

const galleries = [
  { title: 'MRKTBox', routes: MRKTRoutes },
  { title: 'Film', routes: FilmRoutes },
  { title: 'Digital', routes: DigitalRoutes },
];

function InstagramGalleries({ children, home } : InstagramGalleriesProps) {
  const theme = useTheme();
    
  
  const [value, setValue] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    setValue(newValue);
  };

    React.useEffect(() => {
      const handleTabWheel = (event: Event) => {
        const wheelEvent = event as WheelEvent;
        if (wheelEvent.shiftKey) {
          event.preventDefault();
          const nextValue = wheelEvent.deltaY > 0 
            ? Math.min(value + 1, galleries.length)
            : Math.max(value - 1, 1);
          
          if (nextValue !== value) {
            setValue(nextValue);
            setCurrentPage(nextValue);
          }
        }
      };

      const tabList = document.querySelector('[aria-label="instagram-galleries-tabslist"]');
      if (tabList) {
        tabList.addEventListener('wheel', handleTabWheel as EventListener, { passive: false });
      }

      return () => {
        if (tabList) {
          tabList.removeEventListener('wheel', handleTabWheel as EventListener);
        }
      };
    }, [value]);

    return (
        <>
            <TabContext value={value}>
                <Box sx={{
                  display: 'flex',
                  minHeight: home ? undefined : '85.2vh',
                  borderRadius: home ? '8px' : undefined,
                  flexDirection: 'column',
                  paddingTop: '2vh',
                  justifyContent: 'top',
                  alignItems: 'center',
                  backgroundColor: theme.palette.secondary.main,
                }}>
                    <Title color={theme.palette.primary.contrastText} variant="h5" children={"Instagram Media"}/>
                    <List dense={false}>
                            <TabList 
                              onChange={handleChange}
                              aria-label="instagram-galleries-tabslist" 
                              sx={{ 
                                  '& .MuiTabs-flexContainer': {
                                    justifyContent: 'space-evenly',
                                  },
                              }}
                            >
                              {galleries.map((gallery, index) => (
                                <Tab 
                                  sx={{
                                    backgroundColor: theme.palette.primary.contrastText,
                                    color: theme.palette.primary.main,
                                    boxShadow: `0 2px 15px ${theme.palette.primary.contrastText}`,
                                    borderRadius: '8px',
                                  }} 
                                  key={index} 
                                  label={`${gallery.title}`} 
                                  value={index + 1} 
                                />
                              ))}
                            </TabList>

                        {galleries
                            .filter((_, index) => index === currentPage - 1)
                            .map((gallery, __index) => {
                              const itemIndex = currentPage - 1;
              
                              return (
                                  <ListItem key={itemIndex}>
                                    <Box 
                                        sx={{ 
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          display: 'flex',
                                          borderRadius: "8px",
                                          backgroundColor: theme.palette.secondary.main,
                                          flexDirection: 'column',
                                          padding: '1rem',
                                          }}
                                    >
                                      <InstagramGallery home={home} variant={home ? "h6" : "h4"} title={itemIndex>0 ? `${gallery.title} Media` : `${gallery.title} Memories`} routes={gallery.routes}/>
                                    </Box>
                                  </ListItem>
                              );
                            })}
                        { children }
                    </List>
                </Box>
            </TabContext>
        </>
    );
}

export default InstagramGalleries;
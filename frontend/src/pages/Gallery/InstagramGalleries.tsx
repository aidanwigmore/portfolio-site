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
import CustomTooltip from '@/materials/Tooltip';

import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';

import Title from '@/components/Title';

import Theme from '@/Theme';

interface InstagramGalleriesProps {
    children? : React.ReactNode;
}

const galleries = [
  { title: 'MRKTBox', routes: MRKTRoutes },
  { title: 'Film', routes: FilmRoutes },
  { title: 'Digital', routes: DigitalRoutes },
];

function InstagramGalleries({ children } : InstagramGalleriesProps) {
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
                    flexDirection: 'column', 
                    backgroundColor: Theme.palette.secondary.light, 
                }}>
                    <Title children={"Instagram Media"}/>
                    <List dense={false}>
                        <CustomTooltip 
                            text="Shift + scroll or click each tab" 
                            placement="top"
                        >
                            <TabList 
                              onChange={handleChange}
                              aria-label="instagram-galleries-tabslist" 
                              sx={{ 
                                  '& .MuiTabs-flexContainer': {
                                    gap: "0.5rem",
                                    justifyContent: 'center',
                                  },
                              }}
                            >
                              {galleries.map((gallery, index) => (
                                <Tab key={index} label={`${gallery.title}`} value={index + 1} />
                              ))}
                            </TabList>
                        </CustomTooltip>

                        {galleries
                            .filter((_, index) => index === currentPage - 1)
                            .map((gallery, __index) => {
                              const itemIndex = currentPage - 1;
              
                              return (
                                  <ListItem
                                    key={itemIndex}
                                    sx={{
                                        borderRadius: "8px",
                                        width: '100%',
                                    }}
                                  >
                                    <Box 
                                        sx={{ 
                                          width: '100%',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          display: 'flex', 
                                          flexDirection: 'column', 
                                        }}
                                    >
                                      <InstagramGallery title={itemIndex>0 ? `${gallery.title} Media` : `${gallery.title} Appearances`} routes={gallery.routes}/>
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
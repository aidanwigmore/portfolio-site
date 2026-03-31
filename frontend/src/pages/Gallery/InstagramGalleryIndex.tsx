import React, { useState } from 'react';

import { Box } from '@mui/material';

import TabContext from '@mui/lab/TabContext';

import MRKTRoutes from '@/data/MrktRoutes';
import FilmRoutes from '@/data/FilmRoutes';
import DigitalRoutes from '@/data/DigitalRoutes';

import Title from '@/components/Title';

import GalleryTabList from '@/pages/Gallery/GalleryTabList';

import { useTheme } from '@mui/material/styles';

interface InstagramGalleriesProps {
  children?: React.ReactNode;
  home?: boolean;
}

const galleries = [
  { title: 'MRKTBox', routes: MRKTRoutes },
  { title: 'Film', routes: FilmRoutes },
  { title: 'Digital', routes: DigitalRoutes },
];

function InstagramGalleries({ home }: InstagramGalleriesProps) {
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
        const nextValue =
          wheelEvent.deltaY > 0
            ? Math.min(value + 1, galleries.length)
            : Math.max(value - 1, 1);

        if (nextValue !== value) {
          setValue(nextValue);
          setCurrentPage(nextValue);
        }
      }
    };

    const tabList = document.querySelector(
      '[aria-label="instagram-galleries-tabslist"]'
    );
    if (tabList) {
      tabList.addEventListener('wheel', handleTabWheel as EventListener, {
        passive: false,
      });
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
        <Box
          sx={{
            display: 'flex',
            minHeight: home ? undefined : '85.2vh',
            borderRadius: home ? '8px' : undefined,
            flexDirection: 'column',
            paddingTop: '2vh',
            justifyContent: 'top',
            alignItems: 'center',
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Title
            color={theme.palette.primary.contrastText}
            variant="h5"
            children={'Instagram Media'}
          />
          <GalleryTabList
            galleries={galleries}
            handleChange={handleChange}
            currentPage={currentPage}
            home={home}
          />
        </Box>
      </TabContext>
    </>
  );
}

export default InstagramGalleries;

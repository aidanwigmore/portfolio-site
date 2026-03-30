import React, { useState } from 'react';

import TabContext from '@mui/lab/TabContext';

import VideoData from "@/pages/Videos/VideoData";
import VideosTabList from '@/pages/Videos/VideosTabList';

import Box from '@mui/material/Box';

import Title from '@/components/Title';
import { useThumbsUp } from '@/hooks/useThumbsUp';
import { useTheme } from '@mui/material/styles';

interface VideosProps {
  home?: boolean;
}

export default function Videos({ home }: VideosProps) {
  const theme = useTheme();
  
  const { handleThumbsUp } = useThumbsUp('video');

  const items = VideoData;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [value, setValue] = useState<number>(1);
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
            ? Math.min(value + 1, items.length)
            : Math.max(value - 1, 1);
          
          if (nextValue !== value) {
            setValue(nextValue);
            setCurrentPage(nextValue);
          }
        }
      };
  
      const tabList = document.querySelector('[aria-label="tabslist"]');
      if (tabList) {
        tabList.addEventListener('wheel', handleTabWheel as EventListener, { passive: false });
      }
  
      return () => {
        if (tabList) {
          tabList.removeEventListener('wheel', handleTabWheel as EventListener);
        }
      };
    }, [value, items.length]);

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
          <Title color={theme.palette.primary.contrastText} variant="h5" children={"My Youtube Videos"} />
          <VideosTabList
            handleChange={handleChange}
            items={items}
            currentPage={currentPage}
            home={home}
            handleThumbsUp={handleThumbsUp}
          />
        </Box>
      </TabContext>
      </>
  );
}

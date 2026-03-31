import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import ProjectData from '@/pages/Projects/ProjectData';

import { useThumbsUp } from '@/hooks/useThumbsUp';
import Title from '@/components/Title';

import { useTheme } from '@mui/material/styles';

import TabContext from '@mui/lab/TabContext';
import ProjectTabList from '@/pages/Projects/ProjectTabList';

interface ProjectProps {
  home?: boolean;
}

export default function Projects({ home }: ProjectProps) {
  const theme = useTheme();

  const { handleThumbsUp } = useThumbsUp('video');

  const [value, setValue] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const items = ProjectData;

  const handleChange = (__event: React.SyntheticEvent, newValue: number) => {
    setCurrentPage(newValue);
    setValue(newValue);
  };

  const handleNavigateNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    const handleTabWheel = (event: Event) => {
      const wheelEvent = event as WheelEvent;
      if (wheelEvent.shiftKey) {
        event.preventDefault();
        const nextValue =
          wheelEvent.deltaY > 0
            ? Math.min(value + 1, items.length)
            : Math.max(value - 1, 1);

        if (nextValue !== value) {
          setValue(nextValue);
          setCurrentPage(nextValue);
        }
      }
    };

    const tabList = document.querySelector('[aria-label="projects-tabslist"]');
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
  }, [value, items.length]);

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
          {home ? (
            <Title
              color={theme.palette.primary.contrastText}
              variant="h6"
              children={"Projects I've Worked On"}
            />
          ) : undefined}

          <ProjectTabList
            handleChange={handleChange}
            items={items}
            currentPage={currentPage}
            home={home}
            handleNavigateNewTab={handleNavigateNewTab}
            handleThumbsUp={handleThumbsUp}
          />
        </Box>
      </TabContext>
    </>
  );
}

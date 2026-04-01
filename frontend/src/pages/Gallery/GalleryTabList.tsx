import React from 'react';

import { TabList } from '@mui/lab';
import { Box, List, ListItem, Tab } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import InstagramGallery from './InstagramGallery';

interface GalleryTabListProps {
  children?: React.ReactNode;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  currentPage: number;
  home?: boolean;
  galleries: { title: string; routes: any[] }[];
}

function GalleryTabList({
  handleChange,
  currentPage,
  home,
  galleries,
}: GalleryTabListProps) {
  const theme = useTheme();

  return (
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
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: `0 4px 16px ${theme.palette.secondary.light}`,
              },
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
                  borderRadius: '8px',
                  backgroundColor: theme.palette.secondary.main,
                  flexDirection: 'column',
                  padding: '1rem',
                }}
              >
                <InstagramGallery
                  home={home}
                  variant={home ? 'h6' : 'h4'}
                  title={
                    itemIndex > 0
                      ? `${gallery.title} Media`
                      : `${gallery.title} Memories`
                  }
                  routes={gallery.routes}
                />
              </Box>
            </ListItem>
          );
        })}
    </List>
  );
}

export default GalleryTabList;

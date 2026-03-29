import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { 
  Box, 
  Tab,
} from '@mui/material';

import ProjectData from "@/pages/Projects/ProjectData";

import { useThumbsUp } from '@/hooks/useThumbsUp';
import Title from '@/components/Title';
import { CustomTypography } from "@/materials/Typography";

import CustomIconButton from '@/materials/IconButton';
import ThumbUp from '@/components/ThumbUp';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import { useTheme } from '@mui/material/styles';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

interface ProjectProps {
  home?: boolean;
}

export default function Projects( { home } : ProjectProps ) {
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

    const tabList = document.querySelector('[aria-label="projects-tabslist"]');
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
          <Title color={theme.palette.primary.contrastText} variant="h5" children={"Projects I've Worked On"} />
          <List dense={false}>
              <TabList 
                id={'projects-tabslist'}
                onChange={handleChange}
                aria-label="projects-tabslist" 
                sx={{
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'space-evenly',
                  },
                }}
              >
                {items.map((item, index) => (
                  <Tab 
                    sx={{
                      backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.primary.main,
                      boxShadow: `0 2px 15px ${theme.palette.primary.contrastText}`,
                      borderRadius: '8px',
                    }}
                    key={index} 
                    label={`${item.title}`} 
                    value={index + 1} 
                  />
                ))}
              </TabList>
            {items
              .filter((item) => items.indexOf(item) === currentPage - 1)
              .map((item, __index) => {
                const itemIndex = items.indexOf(item);

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
                        backgroundColor: theme.palette.primary.contrastText, 
                        flexDirection: 'column',
                        boxShadow: `0 8px 32px ${theme.palette.primary.contrastText}`,
                        borderRadius: '8px',
                        p: 3,
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', mb: 2, width: '100%' }}>
                        <ThumbUp
                          index={itemIndex} 
                          name={item.title} 
                          ratingCode={item.ratingCode} 
                          onThumbsUp={() => handleThumbsUp(item.ratingCode)}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <CustomTypography color={theme.palette.primary.main} variant={home ? "h6" : "h4"}>
                              {item.title}
                            </CustomTypography>
                            <CustomIconButton
                              name={item.src}
                              actionText={"Navigate to"}
                              onAction={() => handleNavigateNewTab(item.src)} 
                              icon={<LanguageTwoToneIcon/>}
                              ratingCode={'all'}
                              placement={"top"}
                            />
                          </Box>
                          {item.description.map((desc: any, descIndex: any) => (
                            <CustomTypography
                              color={theme.palette.primary.main}
                              key={`${item.title}-desc-${descIndex}`}
                              variant={home ? "caption" : "body2"}
                            >
                              {`- ${desc}`}
                            </CustomTypography>
                          ))}
                        </Box>
                      </Box>

                      {!home && item.src && itemIndex > 0 && (
                        <Box
                          key={`iframe-box-${itemIndex}`}
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                          }}
                        >
                          <iframe
                            key={`iframe-${itemIndex}`}
                            src={item.src}
                            style={{
                              width: '100%',
                              maxWidth: '800px',
                              height: '600px',
                              border: 'none',
                              borderRadius: '8px',
                            }}
                            title={item.title}
                            allowFullScreen
                          />
                        </Box>
                      )}
                    </Box>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </TabContext>
    </>
  );
}
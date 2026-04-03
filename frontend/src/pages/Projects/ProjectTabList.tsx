import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Box, Tab } from '@mui/material';

import { CustomTypography } from '@/materials/Typography';

import ThumbUp from '@/components/ThumbUp';
import CustomLink from '@/materials/Link';

import TabList from '@mui/lab/TabList';
import { useTheme } from '@mui/material/styles';
import CustomTooltip from '@/materials/Tooltip';

interface ProjectTabListProps {
  children?: React.ReactNode;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  items: (
    | {
        title: string;
        description: string[];
        ratingCode: string;
        src: string;
        images?: undefined;
      }
    | {
        title: string;
        description: string[];
        images: string[];
        ratingCode: string;
        src: string;
      }
  )[];
  currentPage: number;
  home?: boolean;
  handleNavigateNewTab: (url: string) => void;
  handleThumbsUp: (ratingCode: string) => void;
}

function ProjectTabListProps({
  handleChange,
  items,
  currentPage,
  home,
  handleNavigateNewTab,
  handleThumbsUp,
}: ProjectTabListProps) {
  const theme = useTheme();

  return (
    <>
      <List dense={false}>
        <TabList
          id={'projects-tabslist'}
          onChange={handleChange}
          aria-label="projects-tabslist"
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
            },
            width: '100%',
          }}
        >
          {items.map((item, index) => (
            <Tab
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.primary.contrastText,
                  boxShadow: `
                    0 4px 16px ${theme.palette.primary.main}
                  `,
                },
              }}
              key={index}
              label={`${item.title}`}
              value={index + 1}
            />
          ))}
        </TabList>
        {items
          .filter((item) => items.indexOf(item) === currentPage - 1)
          .map((item) => {
            const itemIndex = items.indexOf(item);

            return (
              <ListItem
                key={itemIndex}
                sx={{
                  borderRadius: '8px',
                }}
              >
                <Box
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    backgroundColor: theme.palette.primary.contrastText,
                    flexDirection: 'column',
                    boxShadow: `0 4px 16px ${theme.palette.secondary.light}`,
                    borderRadius: '8px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      p: 4,
                    }}
                  >
                    <ThumbUp
                      index={itemIndex}
                      name={item.title}
                      ratingCode={item.ratingCode}
                      onThumbsUp={() => handleThumbsUp(item.ratingCode)}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <CustomTooltip
                          text={`View ${item.src} in a new tab`}
                          placement="top"
                        >
                          <CustomLink
                            onClick={() => handleNavigateNewTab(item.src)}
                            href={item.src}
                          >
                            <CustomTypography
                              color={theme.palette.primary.main}
                              variant={home ? 'h6' : 'h4'}
                            >
                              {item.title}
                            </CustomTypography>
                          </CustomLink>
                        </CustomTooltip>
                      </Box>
                      {item.description.map((desc: string, descIndex: number) => (
                        <CustomTypography
                          color={theme.palette.primary.main}
                          key={`${item.title}-desc-${descIndex}`}
                          variant={home ? 'caption' : 'body2'}
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
    </>
  );
}

export default ProjectTabListProps;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Box, MenuItem, Menu } from '@mui/material';

import {
  Security as SecurityIcon,
  ChevronLeft,
  CameraRoll as CameraRollIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  SdCard as SdCardIcon,
  AccountTreeTwoTone as AccountTreeTwoToneIcon,
  PermMediaTwoTone as PermMediaTwoToneIcon,
  QuestionAnswerTwoTone as QuestionAnswerTwoToneIcon,
  LightModeTwoTone as LightModeTwoToneIcon,
  DarkModeTwoTone as DarkModeTwoToneIcon,
} from '@mui/icons-material';

import CommentDialogButton from '@/components/CommentForm';

import CustomButton from '@/materials/Button';
import CustomTooltip from '@/materials/Tooltip';
import { CustomTypography } from '@/materials/Typography';

import { useTheme } from '@mui/material/styles';

interface NavBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const pageNames: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/videos': 'Videos',
  '/mrkt-media': 'MRKTBox',
  '/film-media': 'Film',
  '/digi-media': 'Digital',
  '/gallery': 'Protected',
};

export default function NavBar({ isDarkMode, toggleTheme }: NavBarProps) {
  const theme = useTheme();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentPageName = pageNames[location.pathname] || 'Portfolio';

  return (
    <>
      <Box
        sx={{
          top: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <CustomButton
          to="/"
          component={Link}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            borderRadius: '8px',
            margin: '0.5rem',
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.primary.main,
            },
          }}
        >
          <CustomTypography
            variant="h1"
            children="Aidan"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          />
        </CustomButton>
        <Box
          sx={{
            position: 'relative',
            top: 0,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: theme.palette.secondary.main,
            padding: '0.5rem',
            flexGrow: 2,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              maxWidth: '90%',
            }}
          >
            <CustomTypography
              variant="h6"
              children={currentPageName}
              sx={{
                color: theme.palette.primary.contrastText,
                marginLeft: '0.5rem',
              }}
            />
            <CustomButton
              component={Link}
              to="/projects"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <AccountTreeTwoToneIcon
                sx={{
                  height: '1.25rem',
                }}
              />
              Projects
            </CustomButton>

            <CustomButton
              component={Link}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <PermMediaTwoToneIcon
                sx={{
                  height: '1.25rem',
                }}
              />
              Media
              <ChevronLeft
                sx={{
                  height: '1.25rem',
                  transform: open ? 'rotate(90deg)' : 'rotate(270deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </CustomButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <CustomButton
                  key="navbar-videos-custom-button"
                  component={Link}
                  to="/videos"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <YouTubeIcon
                      sx={{
                        height: '1.25rem',
                      }}
                    />
                    Videos
                  </Box>
                </CustomButton>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <CustomButton component={Link} to="/mrkt-media">
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    <InstagramIcon sx={{ height: '1.25rem' }} />
                    MRKTBox
                  </Box>
                </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomButton component={Link} to="/film-media">
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    <CameraRollIcon sx={{ height: '1.25rem' }} />
                    Film
                  </Box>
                </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomButton component={Link} to="/digi-media">
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    <SdCardIcon sx={{ height: '1.25rem' }} />
                    Digital
                  </Box>
                </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomButton component={Link} to="/gallery">
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                    <SecurityIcon sx={{ height: '1.25rem' }} />
                    Protected
                  </Box>
                </CustomButton>
              </MenuItem>
            </Menu>
            <CommentDialogButton
              icon={
                <QuestionAnswerTwoToneIcon
                  sx={{
                    height: '1.25rem',
                  }}
                />
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              marginLeft: '2rem',
              marginRight: '2rem',
            }}
          >
            <CustomTooltip
              text={isDarkMode ? 'Switch to Dark Mode?' : 'Switch to Light Mode?'}
              placement="bottom"
            >
              <CustomButton onClick={toggleTheme}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5rem',
                  }}
                >
                  {isDarkMode ? (
                    <LightModeTwoToneIcon
                      sx={{
                        height: '1.25rem',
                      }}
                    />
                  ) : (
                    <DarkModeTwoToneIcon
                      sx={{
                        height: '1.25rem',
                      }}
                    />
                  )}
                </Box>
              </CustomButton>
            </CustomTooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
}

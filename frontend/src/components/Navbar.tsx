import React, { useState}  from 'react'; 
import { Link } from 'react-router-dom';

import { 
  Box,
  MenuItem,
  Menu,
} from '@mui/material';

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

export default function NavBar({isDarkMode, toggleTheme} : NavBarProps) {
  const theme = useTheme();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <Box
        id="navbar-outer-box"
        key="navbar-outer-box"
        sx={{ 
          top: 0,
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <CustomButton
          id="navbar-home-aidan-custom-button"
          key="navbar-home-aidan-custom-button"
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
            id="navbar-home-custom-typography"
            key="navbar-home-custom-typography"
            variant="h1"
            children="Aidan"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          />
        </CustomButton>
        
        <Box
          id="navbar-pages-outer-box"
          key="navbar-pages-outer-box"
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
            id="navbar-pages-outer-box"
            key="navbar-pages-outer-box"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              maxWidth: '90%',
            }}
          >
            <CustomButton 
              id="navbar-projects-custom-button"
              key="navbar-projects-custom-button"
              component={Link} 
              to="/projects"
            >
              <Box
                sx={{
                  display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
              }}>
                <AccountTreeTwoToneIcon
                  sx={{
                    height: '1.25rem',
                  }}
                />
                Projects
              </Box>
            </CustomButton>
            
            <Box>
              <CustomButton
                id="navbar-media-custom-button"
                key="navbar-media-custom-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
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
                  transition: 'transform 0.3s' 
                }} 
              />
            </CustomButton>
            
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              
              <MenuItem 
                onClick={handleClose}
              >
                <CustomButton 
                  id="navbar-videos-custom-button"
                  key="navbar-videos-custom-button"
                  component={Link} 
                  to="/videos"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem'
                    }}
                  >
                    <YouTubeIcon
                      sx={{
                        height: '1.25rem'
                      }}
                    />
                    Videos
                  </Box>
                </CustomButton>
              </MenuItem>
              
              <MenuItem onClick={handleClose}>
                  <CustomButton 
                    id="navbar-mrkt-media-custom-button"
                    key="navbar-mrkt-media-custom-button"
                    component={Link} 
                    to="/mrkt-media"
                  >
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <InstagramIcon sx={{ height: '1.25rem' }}/>
                      MRKTBox
                    </Box>
                  </CustomButton>
              </MenuItem>
              <MenuItem 
                onClick={handleClose}
              >
                <CustomButton 
                  id="navbar-film-media-custom-button"
                  key="navbar-film-media-custom-button"
                  component={Link}
                  to="/film-media"
                >
                  <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                    <CameraRollIcon sx={{ height: '1.25rem' }}/>
                    Film
                  </Box>
                  </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                  <CustomButton 
                    id="navbar-digi-media-custom-button"
                    key="navbar-digi-media-custom-button"
                    component={Link} 
                    to="/digi-media"
                  >
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <SdCardIcon sx={{ height: '1.25rem' }}/>
                      Digital
                    </Box>
                  </CustomButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                  <CustomButton 
                    id="navbar-protected-media-custom-button"
                    key="navbar-protected-media-custom-button"
                    component={Link} 
                    to="/gallery"
                  >
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <SecurityIcon sx={{ height: '1.25rem' }}/>
                      Protected
                    </Box>
                  </CustomButton>
              </MenuItem>
            </Menu>
            <CommentDialogButton
              id="navbar-message-custom-button"
              key="navbar-message-custom-button"
              icon={
                <QuestionAnswerTwoToneIcon
                  sx={{ 
                    height: '1.25rem' 
                  }}
                />
              }
            />
          </Box>
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
            text={
              isDarkMode ? "Switch to Dark Mode?" 
              : "Switch to Light Mode?"
            }
            placement="bottom"
          >
            <CustomButton 
              id="navbar-contrast-mode-custom-button"
              key="navbar-contrast-mode-custom-button"
              onClick={toggleTheme}
            >
              <Box 
                sx={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap: '0.5rem',
                }}
              >
                { 
                  isDarkMode ? 
                    <LightModeTwoToneIcon 
                      sx={{ 
                        height: '1.25rem',
                      }}
                    /> 
                  : 
                    <DarkModeTwoToneIcon 
                      sx={{ 
                        height: '1.25rem',
                      }} 
                    />
                }
              </Box>
            </CustomButton>
          </CustomTooltip>
        </Box>
        </Box>
      </Box>
    </>
  )
}
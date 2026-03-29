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
  HomeTwoTone as HomeTwoToneIcon,
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
      <Box sx={{ 
        top: 0,
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: theme.palette.secondary.main,
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            paddingLeft: '1rem',
          }}
        >
          <CustomTypography sx={{
              color: theme.palette.primary.contrastText, 
              borderRadius: '8px',
            }}
            variant="h1" 
            children={'Aidan Wigmore'}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: 0,
            display: 'flex', 
            flexDirection: 'row',
            backgroundColor: theme.palette.secondary.main,
            padding: '0.5rem',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'auto',
        }}
        > 
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          >
              <CustomButton component={Link} to="/">
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'row', gap: '0.5rem',
                }}>
                  <HomeTwoToneIcon/>
                  Home
                </Box>
              </CustomButton>
              <CustomButton component={Link} to="/projects">
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '0.5rem',
                }}>
                  <AccountTreeTwoToneIcon/>
                  Projects
                </Box>
              </CustomButton>
            <Box>
                <CustomButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '0.5rem',
                    '&: hover': {
                      color: theme.palette.info.main,
                    },
                  }}
                >
                  <PermMediaTwoToneIcon/>
                  Media
                  <ChevronLeft sx={{ transform: open ? 'rotate(90deg)' : 'rotate(270deg)', transition: 'transform 0.3s' }} />
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
                <MenuItem onClick={handleClose}>
                    <CustomButton component={Link} to="/videos">
                      <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                        <YouTubeIcon/>
                        Youtube Videos
                      </Box>
                    </CustomButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <CustomButton component={Link} to="/mrkt-media">
                      <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                        <InstagramIcon/>
                        MRKTBox
                      </Box>
                    </CustomButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <CustomButton component={Link} to="/film-media">
                      <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                        <CameraRollIcon/>
                        Film Gallery
                      </Box>
                    </CustomButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <CustomButton component={Link} to="/digi-media">
                      <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                        <SdCardIcon/>
                        Digital Gallery
                      </Box>
                    </CustomButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <CustomButton component={Link} to="/gallery">
                      <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                        <SecurityIcon/>
                        Protected Gallery
                      </Box>
                    </CustomButton>
                </MenuItem>
              </Menu>
            </Box>
            <CommentDialogButton icon={<QuestionAnswerTwoToneIcon/>}/>
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
                text={isDarkMode ? "Switch to Dark Mode?" : "Switch to Light Mode?"}
                placement="bottom"
              >
                <CustomButton onClick={toggleTheme}>
                  <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                    {
                      isDarkMode ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />
                    }
                  </Box>
                </CustomButton>
              </CustomTooltip>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </>
  )
}
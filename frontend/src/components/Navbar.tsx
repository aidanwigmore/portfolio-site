import React, { useState}  from 'react'; 

import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import CommentDialogButton from '@/components/CommentForm';

import MenuItem from '@mui/material/MenuItem';

import { CustomButton } from '@/materials/Button';
import { CustomDivider } from '@/materials/Divider';
import Menu from '@mui/material/Menu';
import { ChevronLeft } from '@mui/icons-material';
import SecurityIcon from '@mui/icons-material/Security';
import CustomTooltip from '@/materials/Tooltip';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import SdCardIcon from '@mui/icons-material/SdCard';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import PermMediaTwoToneIcon from '@mui/icons-material/PermMediaTwoTone';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';

import Theme from '@/Theme';

export default function NavBar() {
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
      <Box sx={{ display: { justifyContent: 'center', padding: '1vw', display: 'flex', flexDirection: 'row', gap: '1rem'} }}>
          <CustomTooltip 
            text="Navigate to the Home page?"
            placement="left"
          >
            <CustomButton component={Link} to="/">
              <Box
                sx={{
                  display: 'flex', 
                  flexDirection: 'row', gap: '0.5rem'
              }}>
                <HomeTwoToneIcon/>
                Home
              </Box>
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip text="Navigate to the Project page?" placement='top'>
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
          </CustomTooltip>
          <Box>
            <CustomTooltip text="Navigate to Media pages?" placement='top'>
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
                    color: Theme.palette.primary.main,
                  },
                }}
              >
                <PermMediaTwoToneIcon/>
                Media
                <ChevronLeft sx={{ transform: open ? 'rotate(90deg)' : 'rotate(270deg)', transition: 'transform 0.3s' }} />
              </CustomButton>
            </CustomTooltip>
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
                <CustomTooltip text="View My Youtube Videos?" placement="right">
                  <CustomButton component={Link} to="/videos">
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <YouTubeIcon/>
                      Youtube Videos
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View MRKTBox Instagram Gallery?" placement="right">
                  <CustomButton component={Link} to="/mrkt-media">
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <InstagramIcon/>
                      MRKTBox
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View Film Gallery?" placement="right">
                  <CustomButton component={Link} to="/film-media">
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <CameraRollIcon/>
                      Film Gallery
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View Digital Gallery?" placement="right">
                  <CustomButton component={Link} to="/digi-media">
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <SdCardIcon/>
                      Digital Gallery
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View Protected Photo Galleries?" placement="right">
                  <CustomButton component={Link} to="/gallery">
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                      <SecurityIcon/>
                      Protected Gallery
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
            </Menu>
          </Box>
          <CommentDialogButton icon={<QuestionAnswerTwoToneIcon/>}/>
      </Box>
      <CustomDivider/>
    </>
  )
}
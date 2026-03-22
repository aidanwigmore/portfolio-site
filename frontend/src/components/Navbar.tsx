import React, { useState}  from 'react'; 

import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import CommentDialogButton from '@/components/CommentForm';

import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';

import { CustomTypography } from '@/materials/Typography';

import { CustomButton } from '@/materials/Button';
import { CustomDivider } from '@/materials/Divider';
import Menu from '@mui/material/Menu';
import { ChevronLeft } from '@mui/icons-material';
import SecurityIcon from '@mui/icons-material/Security';
import CustomTooltip from '@/materials/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import SdCardIcon from '@mui/icons-material/SdCard';

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
      <Box sx={{ display: { justifyContent: 'center', paddingBottom: '1vw', display: 'flex', flexDirection: 'row', gap: '1rem'} }}>
          <CustomTooltip 
            text="Navigate to the Home page?"
            children={<CustomButton component={Link} to="/">
              <CustomTypography>
                Home
              </CustomTypography>
            </CustomButton>}
          />
          <CustomTooltip text="Navigate to the Project page?">
            <CustomButton component={Link} to="/projects">
              <CustomTypography>
                Projects
              </CustomTypography>
            </CustomButton>
          </CustomTooltip>
          <Box>
            <CustomTooltip text="Navigate to Media pages?">
              <CustomButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Box sx={{padding: 0, display: "flex", flexDirection: "row"}}>
                  <CustomTypography>
                    Media
                  </CustomTypography>
                  <ChevronLeft sx={{ transform: open ? 'rotate(90deg)' : 'rotate(270deg)', transition: 'transform 0.3s' }} />
                </Box>
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
                <CustomTooltip text="View My Youtube Videos" placement="right">
                  <CustomButton component={Link} to="/videos">
                    <Box sx={{display: 'flex'}}>
                      <ListItemIcon>
                        <YouTubeIcon fontSize="small" />
                      </ListItemIcon>
                      <CustomTypography>
                        Youtube Videos
                      </CustomTypography>
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View MRKTBox Instagram Gallery" placement="right">
                  <CustomButton component={Link} to="/mrkt-media">
                    <Box sx={{display: 'flex'}}>
                      <ListItemIcon>
                        <InstagramIcon fontSize="small" />
                      </ListItemIcon>
                      <CustomTypography>
                        MRKTBox
                      </CustomTypography>
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View Film Gallery" placement="right">
                  <CustomButton component={Link} to="/film-media">
                    <Box sx={{display: 'flex'}}>
                      <ListItemIcon>
                        <CameraRollIcon fontSize="small" />
                      </ListItemIcon>
                      <CustomTypography>
                        Film Gallery
                      </CustomTypography>
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View Digital Gallery" placement="right">
                  <CustomButton component={Link} to="/digi-media">
                    <Box sx={{display: 'flex'}}>
                      <ListItemIcon>
                        <SdCardIcon fontSize="small" />
                      </ListItemIcon>
                      <CustomTypography>
                        Digital Gallery
                      </CustomTypography>
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CustomTooltip text="View My Photo Galleries" placement="right">
                  <CustomButton component={Link} to="/gallery">
                    <Box sx={{display: 'flex'}}>
                      <ListItemIcon>
                        <SecurityIcon fontSize="small" />
                      </ListItemIcon>
                      <CustomTypography>
                        Photo Gallery
                      </CustomTypography>
                    </Box>
                  </CustomButton>
                </CustomTooltip>
              </MenuItem>
            </Menu>
          </Box>
          <CommentDialogButton />
      </Box>
      <CustomDivider/>
    </>
  )
}
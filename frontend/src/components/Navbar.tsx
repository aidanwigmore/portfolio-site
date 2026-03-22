import { Link } from "react-router-dom";

import { Box, Tooltip } from "@mui/material";

import CommentDialogButton from "../components/CommentForm";
import { CustomButton } from "../materials/Button";
import { CustomDivider } from "../materials/Divider";

export default function NavBar() {
  return (
    <>
      <Box sx={{ display: { justifyContent: 'center', paddingBottom: '1vw', display: 'flex', flexDirection: 'row', gap: '1rem'} }}>
          <Tooltip title="Navigate to Home Page" arrow>
            <CustomButton component={Link} to="/">
              Home
            </CustomButton>
          </Tooltip>
          <Tooltip title="View Projects I've Worked On" arrow>
            <CustomButton component={Link} to="/projects">
              Projects
            </CustomButton>
          </Tooltip>
          <Tooltip title="View Technical Documentation Videos" arrow>
            <CustomButton component={Link} to="/videos">
              Videos
            </CustomButton>
          </Tooltip>
          <Tooltip title="View Gallery" arrow>
            <CustomButton component={Link} to="/gallery">
              Gallery
            </CustomButton>
          </Tooltip>
          <Tooltip title="View MRKTBox Instagram Gallery" arrow>
            <CustomButton component={Link} to="/mrkt-media">
              MRKTBox Media
            </CustomButton>
          </Tooltip>
          <Tooltip title="View Film Gallery" arrow>
            <CustomButton component={Link} to="/film-media">
              Film Photo Media
            </CustomButton>
          </Tooltip>
          <Tooltip title="View Film Gallery" arrow>
            <CustomButton component={Link} to="/digi-media">
              Digital Photo Media
            </CustomButton>
          </Tooltip>
          <CommentDialogButton />
      </Box>
      <CustomDivider/>
    </>
  )
}
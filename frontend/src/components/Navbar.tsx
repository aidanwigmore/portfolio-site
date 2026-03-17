import CommentForm from "../components/CommentForm";

import { Box, Button, Tooltip } from "@mui/material";

import { Link } from "react-router-dom";

export default function NavBar() {

  return (
    <>
      <Box sx={{ display: { xs: "none", sm: "block", paddingBottom: '5vh' } }}>
          <Tooltip title="Navigate to Home Page" arrow>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </Tooltip>
          <Tooltip title="View Projects I've Worked On" arrow>
            <Button color="inherit" component={Link} to="/projects">
              Projects
            </Button>
          </Tooltip>
          <Tooltip title="View Technical Documentation Videos" arrow>
            <Button color="inherit" component={Link} to="/videos">
              Videos
            </Button>
          </Tooltip>
          <CommentForm />
      </Box>
    </>
  )
}
import React from 'react';

import Snackbar from '@mui/material/Snackbar';

import { useTheme } from '@mui/material/styles';

interface CustomSnackbarProps {
  children? : React.ReactNode;
  openSnackbar: boolean;
  handleClose: () => void;
}

function CustomSnackbar({ openSnackbar, handleClose } : CustomSnackbarProps) {
  const theme = useTheme();
  return <Snackbar sx={{
    backgroundColor: theme.palette.primary.light
  }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} message="Message sent successfully" />;
}

export default CustomSnackbar;

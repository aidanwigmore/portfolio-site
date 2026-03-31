import { useState } from 'react';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import api from '@/api/axios';

import CustomSnackbar from '@/materials/Snackbar';
import CustomTooltip from '@/materials/Tooltip';
import { CustomTypography } from '@/materials/Typography';
import CustomButton from '@/materials/Button';

import { Comment } from '@/types/Comment';

import { useTheme } from '@mui/material/styles';

export interface CommentDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function CommentDialog(props: CommentDialogProps) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const theme = useTheme();

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [comment, setComment] = useState<Comment>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('comments/', comment);

      setComment({
        name: '',
        email: '',
        message: '',
      });

      handleClose();
    } catch (error) {
      console.error(error);
    }
    setOpenSnackbar(true);
  };

  return (
    <>
      <CustomSnackbar openSnackbar={openSnackbar} handleClose={handleClose} />
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            alignItems: 'center',
            justifyContent: 'top',
            paddingBottom: '2rem',
            maxWidth: 'none',
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.primary.contrastText,
            padding: '2rem',
            gap: '0.2rem',
          }}
        >
          <DialogTitle>
            <CustomTypography
              color={theme.palette.primary.main}
              style={{ textAlign: 'center' }}
              gutterBottom
            >
              Send a message
            </CustomTypography>
          </DialogTitle>

          <TextField
            name="name"
            id="filled-basic"
            value={comment.name}
            label="Name"
            variant="filled"
            onChange={handleChange}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              borderRadius: '8px',
            }}
          />
          <TextField
            name="email"
            id="filled-basic"
            label="Email"
            variant="filled"
            value={comment.email}
            onChange={handleChange}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              borderRadius: '8px',
            }}
          />
          <TextField
            name="message"
            id="filled-basic"
            label="Message"
            variant="filled"
            value={comment.message}
            onChange={handleChange}
            multiline
            maxRows={4}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              borderRadius: '8px',
            }}
          />
          <CustomButton
            variant="contained"
            type="submit"
            onClick={submit}
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                boxShadow: `0 4px 16px ${theme.palette.primary.main}`,
              },
            }}
          >
            Send
          </CustomButton>
        </Box>
      </Dialog>
    </>
  );
}

interface CommentDialogButtonProps {
  id?: string;
  icon: React.ReactNode;
}

export default function CommentDialogButton({ id, icon }: CommentDialogButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <CustomTooltip
        id={`${id}-custom-tooltip`}
        text={'Send a message?'}
        placement={'top'}
      >
        <CustomButton variant="contained" onClick={handleClickOpen}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 'auto',
            }}
          >
            {icon}
            Message me
          </Box>
        </CustomButton>
      </CustomTooltip>
      <CommentDialog open={open} selectedValue={selectedValue} onClose={handleClose} />
    </>
  );
}

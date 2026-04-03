import { useState } from 'react';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import api from '@/api/axios';

import TextField from '@/materials/TextField';
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
            boxShadow: `0 4px 16px ${theme.palette.secondary.light}`,
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
              variant="h6"
              sx={{ marginBottom: '1.5rem' }}
            >
              Send A Message
            </CustomTypography>
          </DialogTitle>

          <TextField name="name" value={comment.name} onChange={handleChange} />
          <TextField name="email" value={comment.email} onChange={handleChange} />
          <TextField
            name="message"
            value={comment.message}
            onChange={() => handleChange}
            multiline={true}
            maxRows={true}
          />
          <CustomButton variant="contained" type="submit" onClick={submit}>
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

import { useState } from "react"
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import api from '@/api/axios';

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
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post("comments/", comment)

      setComment({
        name: "",
        email: "",
        message: ""
      })

      handleClose()

    } catch (error) {
      console.error(error)
    }
    setOpenSnackbar(true);
  }

  return (
    <>
      <Snackbar
        sx={{backgroundColor: theme.palette.primary.light}}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Message sent successfully"
      />
      <Dialog 
        PaperProps={{
          sx: {
            alignItems: "center",
            justifyContent: "top",
            paddingBottom: "2rem",
            maxWidth: "none",
        },
        }} 
        onClose={handleClose} 
        open={open}
      >
        <Box
          component="form"
          sx= {{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
        }}>
          <DialogTitle>
            <CustomTypography style={{textAlign: "center"}} gutterBottom>
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
            />
            <TextField 
              name="email" 
              id="filled-basic" 
              label="Email" 
              variant="filled" 
              value={comment.email} 
              onChange={handleChange}
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
            />
            <CustomButton variant="contained" type="submit" onClick={submit} >
              Send
            </CustomButton>
        </Box>
      </Dialog>
    </>
  );
}

interface CommentDialogButtonProps {
  icon: React.ReactNode;
}

export default function CommentDialogButton({icon}: CommentDialogButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <CustomTooltip text={"Send a message?"} placement={"top"}>
        <CustomButton variant="contained" onClick={handleClickOpen}>
          <Box  sx={{display: 'flex', flexDirection: 'row', width: 'auto'}}>
            {icon}
            Message me
          </Box>
        </CustomButton>
      </CustomTooltip>
      <CommentDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
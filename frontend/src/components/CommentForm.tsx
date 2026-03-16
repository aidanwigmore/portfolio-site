import { useState } from "react"
import api from "../api/axios"
import { Comment } from "../types/Comment"
import Button from '@mui/material/Button';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { CustomTypography } from "../materials/Typography";

export interface CommentDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function CommentDialog(props: CommentDialogProps) {
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
  }

  return (
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
      <DialogTitle>
        <CustomTypography style={{textAlign: "center"}} variant="h3" gutterBottom>
          Send a message
        </CustomTypography>
      </DialogTitle>
      <form onSubmit={submit}>

      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          name="name" 
          id="filled-basic" 
          value={comment.name} 
          label="Name" 
          variant="filled" 
          onChange={handleChange} 
        />
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          name="email" 
          id="filled-basic" 
          label="Email" 
          variant="filled" 
          value={comment.email} 
          onChange={handleChange}
        />
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextareaAutosize
          aria-label="message-textarea"
          placeholder="Message"
          name="message"
          value={comment.message}
          onChange={handleChange}
        />
      </Box>

      <Button variant="contained" type="submit">
        Send
      </Button>

      </form>
        
    </Dialog>
  );
}

export default function CommentDialogDemo() {
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
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Send a message
      </Button>
      <CommentDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
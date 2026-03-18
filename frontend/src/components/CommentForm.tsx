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
import { Tooltip } from "@mui/material";

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
      <Box
        component="form"
        sx= {{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
      }}>
        <DialogTitle>
          <CustomTypography style={{textAlign: "center"}} variant="h3" gutterBottom>
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
        <TextareaAutosize
          aria-label="message-textarea"
          placeholder="Message"
          name="message"
          value={comment.message}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
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
    <>
      <Tooltip title="Send a message" arrow>
        <Button color="inherit" onClick={handleClickOpen}>
          Message me
        </Button>
      </Tooltip>
      <CommentDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
import { useState } from "react"
import api from "../api/axios"
import { Comment } from "../types/Comment"
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { CustomTypography } from "../materials/Typography";
import { Tooltip } from "@mui/material";

import { CustomButton } from "../materials/Button";

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
          <CustomTypography style={{textAlign: "center"}} gutterBottom>
            Send a message
          </CustomTypography>
        </DialogTitle>

        <form>
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
          <CustomButton variant="contained" type="submit" onClick={submit} >
            Send
          </CustomButton>
        </form>
      </Box>
    </Dialog>
  );
}

export default function CommentDialogButton() {
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
        <CustomButton variant="contained" onClick={handleClickOpen}>
          Message me
        </CustomButton>
      </Tooltip>
      <CommentDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
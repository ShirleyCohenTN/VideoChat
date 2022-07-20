import React, { useContext, useState } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import useClasses from "../hooks/useClassesHook";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { socket, SocketContext } from "../SocketContext";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox";
import { useEffect } from "react";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
  },
  container: {
    width: "600px !important",
    margin: "35px 0",
    padding: 0,
    marginTop: "0%",
  },
  margin: {
    marginTop: "3% !important",
    // width:"30% !important",
  },
  padding: {
    padding: "2% !important",
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
});
const DuringAcall = ({ children }) => {
  const {
    leaveCall,
    idToCall,
    me,
    setMe
  } = useContext(SocketContext);

  const classes = useClasses(styles);

 useEffect(()=>{
    socket.emit("join-room", idToCall)
 }, [])

 console.log("my id DuringAcall => ", me)
  console.log("we are duringAcall , id => ", idToCall);

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <ChatBox />

        <Box textAlign="center">
          <Button
            variant="contained"
            color="error"
            width="40%"
            startIcon={<PhoneDisabled fontSize="large" />}
            onClick={leaveCall}
            className={classes.margin}
          >
            Hang Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DuringAcall;

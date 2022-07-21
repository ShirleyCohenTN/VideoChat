import React, { useContext } from "react";
import {
  Button,
  Box,
  Container,
  Paper,
} from "@mui/material";
import useClasses from "../hooks/useClassesHook";
import { PhoneDisabled } from "@mui/icons-material";
import { socket, SocketContext } from "../SocketContext";
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
  },
  padding: {
    padding: "2% !important",
  },
  paper: {
    padding: "10px 20px",
    background: "transparent !important",
    borderColor: "transparent !important",
    borderShadow: "transparent !important"

  },
});
const DuringAcall = ({ children }) => {
  const {
    leaveCall,
    idToCall,
  } = useContext(SocketContext);

  const classes = useClasses(styles);

 useEffect(()=>{
    socket.emit("join-room", idToCall)
 }, [])

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <ChatBox />
      </Paper>
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
    </Container>
  );
};

export default DuringAcall;

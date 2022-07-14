import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return <>
    {
      call.isReceivedCall && !callAccepted && (
        <div style={{display: "flex", justifyContent: "center"}}>
          
          <Typography variant="h6" color="green" style={{fontWeight:"bold"}}>
          {call.callerName} is calling: 
          </Typography>
           
         
        <Button variant="contained" color="success" style={{marginLeft:"1%"}} onClick={answerCall}>
           Answer
        </Button>
        </div>
      )
    }
    </>;
};

export default Notifications;

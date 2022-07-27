import React, { useContext, useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import useClasses from "../hooks/useClassesHook";
import { SocketContext } from "../SocketContext";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import { ToggleButton } from "@mui/material";

const styles = (theme) => ({
  video: {
    width: "450px !important",
    height: "300px",
  },
  gridContainer: {
    justifyContent: "center !important",
  },
  paper: {
    padding: "5px",
    border: "2px solid black",
    margin: "10px",
    flexDirection:"row",
    textAlign: "center",
   
  },
});

const VideoPlayer = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    callerName,
    callEnded,
    closeCamera,
    muteMicrophone,
  } = useContext(SocketContext);
  const classes = useClasses(styles);
  const [cameraSelected, setCameraSelected] = useState(true);
  const [micSelected, setMicSelected] = useState(true);

  return (
    <Grid container className={classes.gridContainer}>
      {/* {our own video} */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
          <Grid>
          <ToggleButton color="primary"
              onClick={() => closeCamera()}
              selected={cameraSelected}
              onChange={() => {
                setCameraSelected(!cameraSelected);
              }}
            >
              <VideocamIcon />
            </ToggleButton>

            <ToggleButton color="primary"
              onClick={() => muteMicrophone()}
              selected={micSelected}
              onChange={() => {
                setMicSelected(!micSelected);
              }}
            >
              <MicIcon />
            </ToggleButton>
          </Grid>
          
        </Paper>
        
      )}

      {/* {user's own video} */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;

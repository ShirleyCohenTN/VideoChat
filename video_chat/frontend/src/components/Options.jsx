import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import useClasses from "../hooks/useClassesHook";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "../SocketContext";

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
  },
  margin: {
    marginTop: "3% !important",
  },
  padding: {
    padding: "2% !important",
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  }
});

//children from the props, means that we can pass any data from the Notifications to the Options
const Options = ({ children }) => {
  const {
    callAccepted,
    callerName,
    setCallerName,
    callEnded,
    me,
    callUser,
    leaveCall,
  } = useContext(SocketContext);

  const classes = useClasses(styles);

  const [idToCall, setIdToCall] = useState("");
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
                <TextField
                  label="name"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  fullWidth
                />
                <CopyToClipboard text={me} className={classes.margin}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                  >
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom styles={{marginBottom:"2%"}} variant="h6">
                Make a call
                <TextField
                  label="ID to call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<PhoneDisabled fontSize="large" />}
                    onClick={leaveCall}
                    className={classes.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    fullWidth
                    startIcon={<Phone fontSize="large" />}
                    onClick={() => callUser(idToCall)}
                    className={classes.margin}
                  >
                    Call
                  </Button>
                )}
              </Typography>
            </Grid>
          </Grid>
        </form>
        {/* children => Notifications componenet */}
        {children}
      </Paper>
    </Container>
  );
};

export default Options;

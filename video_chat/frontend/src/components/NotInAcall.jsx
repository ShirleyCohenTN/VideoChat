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
import { Assignment, Phone} from "@mui/icons-material";
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
      marginTop:"0%"
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
    },
    
  });
  const NotInAcall = ({ children }) => {
    const {
      callerName,
      setCallerName,
      me,
      callUser,
      idToCall,
      setIdToCall
    } = useContext(SocketContext);
  
    const classes = useClasses(styles);
 
    return (
      <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
  
          {/* children => Notifications componenet */}
   {children}
   
          <form  className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.gridContainer}>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h6">
                  Enter your name
                  <TextField
                    label="your name"
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
              
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Phone fontSize="large" />}
                      onClick={() => callUser(idToCall)}
                      className={classes.margin}
                    >
                      Call
                    </Button>
                
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  };

export default NotInAcall
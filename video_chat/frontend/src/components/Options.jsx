import React, { useContext} from "react";
import { SocketContext } from "../SocketContext";
import DuringAcall from "./DuringAcall";
import NotInAcall from "./NotInAcall";

//children from the props, means that we can pass any data from the Notifications to the Options
const Options = ({ children }) => {
  const {
    callAccepted,
    callEnded
  } = useContext(SocketContext);

  console.log("callAccepted => ", callAccepted);

  return (

    callAccepted && !callEnded ? <DuringAcall></DuringAcall> : <NotInAcall> {children} </NotInAcall>
  );
};

export default Options;

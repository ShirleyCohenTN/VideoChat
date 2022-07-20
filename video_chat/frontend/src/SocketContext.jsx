import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

export const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callerName, setCallerName] = useState("");
  const [idToCall, setIdToCall] = useState("");


  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    //as the app mounts, we will ask for the user permissions for camera+audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("calluser", ({ from, callerName, signal }) => {
      setCall({ isReceivedCall: true, from, callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    //the "initiator" is false, because we don't make/ create a call, we accept it.
    const peer = new Peer({ initiator: false, trickle: false, stream }); //peer is going to act like socket

    //when we recieve the signal
    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    //the stream for the other person
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream }); //initiator is true, we create the call

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        callerName,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);


    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    //destory the connection
    connectionRef.current.destroy();

    //reload the page and provide the user with a new id
    window.location.reload();
  };

  return (
    //the value now is globally all over our componenets
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callerName,
        setCallerName,
        callEnded,
        me,
        callUser,
        answerCall,
        leaveCall,
        idToCall,
        setIdToCall
      }}
    >
        {children}
    </SocketContext.Provider>
  );
};

export {ContextProvider, SocketContext};

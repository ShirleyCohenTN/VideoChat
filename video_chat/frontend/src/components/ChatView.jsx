import React, { useState, useEffect } from "react";
// import { socket } from "../SocketContext";
import { io } from "socket.io-client";

// const socket = io.connect("http://localhost:5000");
const socket = io("http://localhost:5000");

function ChatView() {
  const [chatMessages, setChatMessages] = useState([]);


  const mapElements = () => {
    console.log("we are in mapElements function...");
    let element = (chatMessages|| []).map((v, index) => (
      <div key={index}>{v}</div>
    ));
    return element;
  };

  useEffect(()=>{
     console.log("msgs array => ", chatMessages);
     console.log("array length => ", chatMessages.length);
  },[chatMessages])

  socket.on("get-msg", (text) => {
    console.log("get-msg, client side");
    setChatMessages([...chatMessages, text]);
  });

  return (
    <div
      style={{
        height: 80,
        background: "white",
        maxHeight: "150px",
        overflow: "auto",
        padding: "2%",
      }}
    >
      {mapElements()}
    </div>
  );
}

export default ChatView;

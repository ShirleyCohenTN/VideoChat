import React, { useState, useEffect } from "react";
import { socket } from "../SocketContext";

function ChatView() {
  const [chatMessages, setChatMessages] = useState([]);

  const mapElements = () => {
    console.log("we are in mapElements function...");
    let element = (chatMessages|| []).map((v, index) => (
      <div key={index}>{v}</div>
    ));
    return element;
  };

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
        scrollBehavior: "smooth",
        display: "flex",
        flexDirection:"column",
        border: "2px solid black",
        width: "239%",
        fontFamily:"Helvetica"
      }}
    >
      <div style={{textAlign: "center", fontWeight:"bold", fontFamily:"Helvetica"}}>
       Start Chatting! &#128513;	
        </div>
      {mapElements()}
    </div>
  );
}

export default ChatView;

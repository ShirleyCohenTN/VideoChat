import React, { useState, useEffect } from "react";
import { socket } from "../SocketContext";
import "../css/ChatView.css"

function ChatView() {
  const [chatMessages, setChatMessages] = useState([]);

  const mapElements = () => {
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
    className="chatview-container"
    >
      <div className="inner-title">
       Start Chatting! &#128513;	
        </div>
      {mapElements()}
    </div>
  );
}

export default ChatView;

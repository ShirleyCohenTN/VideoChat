import React, { useState } from "react";
import { socket } from "../SocketContext";

function ChatView() {
  const [chatMessages, setChatMessages] = useState(["hi", "he"]);

  const mapElements = () => {
    let element = (chatMessages || []).map((v, index) => (
      <div key={index}>{v}</div>
    ));
    return element;
  };

  socket.on("get-msg", (sender, text) => {
    console.log("message recieved!");
    chatMessages.push(text);
    setChatMessages(chatMessages);
  })

  return (
    <div
      style={{
        height: 80,
        background: "white",
        maxHeight: "150px",
        overflow: "auto",
        padding:"2%"
      }}
    >
      {mapElements()}
    </div>
  );
}

export default ChatView;

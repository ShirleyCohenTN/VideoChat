import React, {useState, useContext} from 'react'
import {SocketContext} from "../SocketContext";
import { io } from "socket.io-client";

// const socket = io.connect("http://localhost:5000");
const socket = io("http://localhost:5000");


function ChatWrite({callerInfo}) {
const [chatMessage, setChatMessage] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submittedd");
    socket.emit("send-msg", callerInfo + ": " + chatMessage);
    setChatMessage("");
  };

  const handleChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={{
            width: "98%",
            height: 40,
            border: "none",
            borderTopStyle: "solid",
            borderTopWidth: 2,
            borderTopColor: "gray",
            paddingLeft: "2%"
          }}
          type="text"
          placeholder="Write Something"
          value={chatMessage}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default ChatWrite
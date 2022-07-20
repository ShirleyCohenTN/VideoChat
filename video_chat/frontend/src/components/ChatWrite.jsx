import React, {useState, useContext} from 'react'
import {socket, SocketContext} from "../SocketContext";
import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");


function ChatWrite() {
const [chatMessage, setChatMessage] = useState("");
let {callerName, me, idToCall } = useContext(SocketContext);

if(!callerName){
  callerName ="user";
}

console.log("my id => ", me);


const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submittedd");
    socket.emit("send-msg", callerName + ": " + chatMessage, idToCall, me);
    setChatMessage("");
  };

  const handleChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div>
      <form style ={{display: "inline-block"}} onSubmit={handleSubmit}>
        <input
          style={{
            width: "294%",
            height: 40,
            // border: "none",
            // borderTopStyle: "solid",
            borderTopWidth: 2,
            // borderTopColor: "gray",
            paddingLeft: "2%",
            border: "2px solid black !important",
            display:"block !important",
            marginRight: "auto !important",
            marginLeft: "auto !important",
          }}
          type="text"
          placeholder="Write Something..."
          value={chatMessage}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default ChatWrite
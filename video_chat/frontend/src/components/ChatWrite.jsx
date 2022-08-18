import React, { useState, useContext } from "react";
import { socket, SocketContext } from "../SocketContext";
import "../css/ChatWrite.css"


function ChatWrite() {
  const [chatMessage, setChatMessage] = useState("");
  let { callerName, me, idToCall } = useContext(SocketContext);

  if (!callerName) {
    callerName = "user";
  }

  // console.log("my id => ", me);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-msg", callerName + ": " + chatMessage, idToCall, me);
    setChatMessage("");
  };

  const handleChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div>
      <form style={{ display: "inline-block" }} onSubmit={handleSubmit}>
        <input
          className="chatwrite-container"
          type="text"
          placeholder="Type your message and hit ENTER"
          value={chatMessage}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default ChatWrite;

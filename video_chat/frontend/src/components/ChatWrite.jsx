import React, {useState, useContext} from 'react'
import {SocketContext} from "../SocketContext";


function ChatWrite({callerInfo}) {
const socket = useContext(SocketContext);
const [chatMessage, setChatMessage] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
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

        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  )
}

export default ChatWrite
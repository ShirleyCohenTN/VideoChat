import React, {useState, useContext} from 'react'
import {socket, SocketContext} from "../SocketContext";

function ChatWrite() {
const [chatMessage, setChatMessage] = useState("");
let {callerName, me, idToCall } = useContext(SocketContext);

if(!callerName){
  callerName ="user";
}

console.log("my id => ", me);


const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
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
            width: "298%",
            height: 40,
            borderTopWidth: 2,
            paddingLeft: "2%",
            border: "2px solid black !important",
            display:"block !important",
            marginRight: "auto !important",
            marginLeft: "auto !important",
            marginTop: "0.5px"
          }}
          type="text"
          placeholder="Type your message and hit ENTER"
          value={chatMessage}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default ChatWrite
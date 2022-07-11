import React from 'react'
import ChatView from "./ChatView"
import ChatWrite from "./ChatWrite"

function ChatBox() {
  return (
    <div style={{ width: "40%" }}>
     <ChatView/>
     <ChatWrite/>
    </div>
  )
}

export default ChatBox
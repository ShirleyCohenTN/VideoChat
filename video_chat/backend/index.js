import express, { text } from "express";
import {createServer} from "http";
import cors from "cors";
import {Server} from "socket.io";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running.");
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    // console.log("connected")

    console.log("my id is => ", socket.id);

    //broadcast => sending a message to all connected clients
    socket.on("disconnect", () => {
        socket.broadcast.emit("callended")
    });

    socket.on("calluser", ({userToCall, signalData, from, callerName}) => {
       io.to(userToCall).emit("calluser", {signal: signalData, from, callerName})
    })

    socket.on("answercall", (data) => {
      io.to(data.to).emit("callaccepted", data.signal)
    })

    socket.on("send-msg", (text, room, me) => {
        if(room === ""){
            io.in(socket.id).emit("get-msg", text);
            console.log("i am in if and my id is => ", socket.id)
            
        }
        else{
            io.in(room).emit("get-msg", text)
            console.log("i am in else and my id is => ", socket.id)
        }
        console.log(`a message was sent from ${socket.id}, id: ${me} => ${text}`);

    })

    socket.on("join-room", (room) => {
        if(room === "")
        {
          socket.join(socket.id);
          console.log(`user:${socket.id} === i am in join-room => ${socket.id}`)
        }else{
            socket.join(room) 
            console.log(`user:${socket.id} === i am in join-room => ${room}`)
        }
       
    })

})

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})


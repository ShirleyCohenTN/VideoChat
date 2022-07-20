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

    //THE WORKING ONE
    // socket.on("send-msg", (text, room) => {
    //     console.log(`a message was sent from ${socket.id} => ${text}`);
    //     io.emit("get-msg", text)

    // })

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
        // io.emit("get-msg", text)

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

    // socket.on("send-msg", (text, room) => {
    //     if(room === ""){
    //         socket.broadcast.emit("get-msg", text)
    //     }else{
    //         socket.join(room)
    //         console.log("we joined the room")
    //         console.log("we got to here, means we are in the room ", room)
    //         io.to(room).emit("get-msg", text)
    //     }
    //     console.log(`a message was sent from ${socket.id} => ${text}`);
    //     // io.emit("get-msg", text)
    // })

    // socket.on("get-msg", (text) => {
    //     console.log("we are on server - get-msg");
    //     io.emit("get-msg", text);
    // })
})

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})


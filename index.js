console.clear();
const express = require("express");
const colors = require('colors');
const { Server } = require("socket.io")
const cors = require('cors')
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})
io.on('connection', (socket) => {
    console.log(io.engine.clientsCount)
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(room)
        console.log(socket.id, socket.rooms)
    })
    socket.on('sendMessage', (data) => {
        console.log(data)
        socket.to(data?.room).emit('receiveMessage', data)
    })
})
app.get("/", (req, res) => res.send("welcome"))
server.listen(port, () => console.log("server is running".bold.red))

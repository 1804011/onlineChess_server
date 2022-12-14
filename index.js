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
    socket.join('1234')
    console.log(socket.id)
    // socket.on('joinRoom', (room) => {
    //     socket.emit('response', room);
    //     socket.join(room);
    //     console.log(room)

    // })
    socket.on('sendMessage', (data) => {
        console.log(data);
        socket.to('1234').emit('receiveMessage', data)
    })
})
app.get("/", (req, res) => res.send("welcome"))
server.listen(port, () => console.log("server is running".bold.red))

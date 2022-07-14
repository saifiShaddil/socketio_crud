const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, { cors: {
    origin: "http://127.0.0.1:5173",
}})

io.on('connection', (socket) => {
    // console.log(`a user connected ${socket.id}`);
    socket.on('get_count', (data) => {
        // console.log(data);
        socket.broadcast.emit('recieve_count', data)
    })

    socket.on('disconnect', () => {
        // console.log(`a user disconnected ${socket.id}`);
    })
})

const PORT = process.env.PORT || 4000;

server.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
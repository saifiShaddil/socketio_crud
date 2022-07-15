const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.route');

dotenv.config();

const app = express();

app.use(cors())

app.use(
  express.urlencoded({
    extended: true,
  })
)

let allUsers = []

// Connect to the database
mongoose.connect(process.env.DB_URL)

let db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to the database.")
})

db.on("error", (err) => {
  console.log(`Database error: ${err}`)
})

const server = http.createServer(app);


app.use(bodyParser.json());


app.use('/api/users', usersRouter);

const io = new Server(server, { cors: {
    origin: process.env.corsOrigin,
}})

io.on('connection', (socket) => {
    // console.log(`a user connected ${socket.id}`);
    socket.on('get_count', (data) => {
        socket.broadcast.emit('recieve_count', data)
    })

    socket.on('addNew', (data) => {
        allUsers[allUsers.length] = data
        socket.broadcast.emit('recieve_addNew', allUsers)
    })
    socket.on('update', (data) => {
        socket.broadcast.emit('recieve_update', data)
        
    })
    socket.on('delete', (data) => {
        socket.broadcast.emit('recieve_delete', data)
    })

    socket.on('disconnect', () => {
        console.log(`a user disconnected ${socket.id}`);
    })
})

const PORT = process.env.PORT || 4000;

server.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
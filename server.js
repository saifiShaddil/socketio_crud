const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.route');

// Accessing the path module
const path = require("path");

dotenv.config();

const app = express();

app.use(cors())

app.use(
  express.urlencoded({
    extended: true,
  })
)


// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/records')

let db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to the database.")
})

db.on("error", (err) => {
  console.log(`Database error: ${err}`)
})

const server = http.createServer(app);


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use('/api/users', usersRouter);

const io = new Server(server)

io.on('connection', (socket) => {
    // console.log(`a user connected ${socket.id}`);
    socket.on('get_count', (data) => {
        socket.broadcast.emit('recieve_count', data)
    })

    socket.on('addNew', (data) => {
      socket.broadcast.emit('recieve_addNew', data)
    })
    socket.on('update', (data) => {
      socket.broadcast.emit('recieve_update', data)  
    })
    socket.on('delete', (data) => {
      socket.broadcast.emit('deletion_id', data)
    })

    socket.on('disconnect', () => {
        console.log(`a user disconnected ${socket.id}`);
    })
})

const PORT = process.env.PORT || 4000;

// serveing the static build from reactjs
app.use(express.static(path.join(__dirname, './client/dist')));
app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});


server.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { env } = require("./config/globals");
const { createConnection } = require("./db");
const initRestRoutes = require("./routes/index");
const corsMiddleware = require("./middlewares/cors");
const errorHandler = require("./middlewares/error-handler");

const port = env.PORT;

const app = express();
const server = http.Server(app);
const io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect mongoose
createConnection();

app.use(corsMiddleware);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

initRestRoutes(app);

app.use(errorHandler);

app.get("/", (req, res) => res.send("Hello World test!"));

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  socket.on('addChannel', () => {
    io.emit('getChannels')
  })
  socket.on('sendMessage', (channel) => {
    io.emit('getMessages', channel)
  })
  socket.on('joinChannel', (channelId) => {
    console.log('channelId', channelId)
    io.emit('getMembersChannel', channelId)
  })
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const dirPath = path.join(__dirname, "public");

const app = express();

app.get("/", (req, resp) => {
  resp.sendFile(dirPath + "/index.html");
});

app.get("/about", (req, resp) => {
  resp.sendFile(dirPath + "/about.html");
});

app.get("/contact", (req, resp) => {
  resp.sendFile(dirPath + "/contact.html");
});

app.get("*", (req, resp) => {
  resp.send("Page Not Found 404");
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);
    console.log('Message broadcasted:', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const express = require('express')
const {Server} = require("socket.io")
const path = require('path')
const dirPath = path.join(__dirname , "public")

const app = express();

app.get("/" , (req , resp)=>{
 resp.sendFile(dirPath + "/index.html")
})

app.get("/about" , (req,resp)=>{
    resp.sendFile(dirPath + "/about.html")
})


app.get("/contact" , (req,resp)=>{
    resp.sendFile(dirPath + "/contact.html")
})


app.get("*" , (req,resp)=>{
   resp.send("Page Not Found 404")
})

const server = app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000")
})

const io = new Server(server);

io.on("connection" , (socket)=>{
  console.log("A User Connected")

  socket.on("chat message" , (msg)=>{
   console.log("Message Received : " + msg)
    io.emit("chat message" , msg) 
  })

  socket.on("disconnect" , ()=>{
    console.log("A user disconnected")
  })
})



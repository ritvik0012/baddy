const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const {MongoClient, ServerApiVersion} = require("mongodb");
const mongoose = require('mongoose');
const User = require('./models/users');
const io = new Server(server);


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/baddy";

mongoose.connect(uri);


app.get('/', (req, res) => {
  res.render("")
})

app.post('/login', (req,res) => {
  console.log(req.body)
  const user = new User({
    username: req.body.uname,
    password: req.body.psw,
  });

  user.save().then((value) => {
    console.log(value)
    console.log("Entry added in database");
  }).catch((err) => console.log(err));
  
})

io.on('connection', (socket) => {
    console.log("A new user connected");
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
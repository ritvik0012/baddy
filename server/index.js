const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const User = require('./models/users');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes/session')
const cors = require('cors');
const io = new Server(server); //for socket.io maybe in future


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "build")));//trying it out
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use(cors());

app.use(session({ 
  cookie: {maxAge: 60000},
  keys: ["secret"],
  saveUninitialized: true,
  resave: "true",
  secret: 'secret' 
}));
app.use(flash());
app.use("/",routes)

const uri = "mongodb://localhost:27017/baddy";

mongoose.connect(uri);

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
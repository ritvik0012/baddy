const express = require('express');
const app = express();
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
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
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

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
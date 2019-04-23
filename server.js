const express = require("express");
const app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

require("dotenv").config();
global.fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require('mongoose', ()=> console.log('moongose connected'))
const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.connect(process.env.dbURI, { useNewUrlParser: true }, ()=>console.log('mongose connecteed'))

const passportSetup = require('./passportsetup');
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server.listen(80);
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

app.set("port", process.env.PORT || 3001);

app.use("/", require("./routes"));

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}/`);
});

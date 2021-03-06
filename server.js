// @flow
const express = require('express');

const app = express();
require('dotenv').config();
global.fetch = require('node-fetch');
const bodyParser = require('body-parser');
const session = require('express-session');

const socket = require('socket.io');


const cors = require('cors');
//serve
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const passport = require('passport');
console.log('here')
require('./passportsetup')(passport);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());


const mongoose = require('mongoose');

mongoose.connect(process.env.dbURI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

// TO DO: use websockets instead of pusher
// const Pusher = require('pusher');
// TO DO END
// TO DO: USE THIS SOMEWHERE
// const passportSetup = require('./passportsetup');

// move this to controllers [[1]]
// const pusher = new Pusher({
//   appId: process.env.push_app_id,
//   key: process.env.pusher_key,
//   secret: process.env.pusher_secret,
//   cluster: process.env.pusher_cluster,
//   encrypted: true,
// });

// app.post('/message', (req, res) => {
//   const payload = req.body;
//   pusher.trigger('my-channel', 'my-event', {
//     code: payload,
//   });
//   res.send(payload);
// });


// app.set('port', process.env.PORT || 3001);
app.use('/', require('./routes'));


if (process.env.NODE_ENV === 'production') {
  const path = require("path")
  app.use(express.static(path.join(__dirname, "client", "build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


const port = process.env.PORT || 3001;
const server = app.listen(port);
const io = socket(server);


io.on('connection', (sock) => {
  console.log('connected to ', sock.id);
  // sock.on('disconnect', () => {
  //   console.log('user disconnected');
  // });
  sock.on('chat', (data) => {
    // console.log('data', data);
    sock.broadcast.emit('chat', data);
  });
});


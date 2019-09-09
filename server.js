// @flow
const express = require('express');

const app = express();
require('dotenv').config();
global.fetch = require('node-fetch');
const bodyParser = require('body-parser');
const session = require('express-session');

const socket = require('socket.io');


const cors = require('cors');

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const passport = require('passport');
require('./passportSetup')(passport);

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


app.set('port', process.env.PORT || 3001);
app.use('/', require('./routes'));

// TO DO: might need to move this
const server = app.listen(app.get('port'), (req) => {
  console.log(`Server at: http://localhost:${app.get('port')}/`);
});
const io = socket(server);

io.on('connection', (sock) => {
  console.log('connected to ', sock.id);
  sock.on('disconnect', () => {
    console.log('user disconnected');
  });
  sock.on('chat', (data) => {
    console.log('data', data);
    io.emit('chat', data);
  });
});

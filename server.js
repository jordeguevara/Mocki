// @flow
const express = require('express');

const app = express();
require('dotenv').config();
global.fetch = require('node-fetch');
const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');

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

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');

mongoose.connect(process.env.dbURI, { useNewUrlParser: true });
// TO DO: use websockets instead of pusher
const Pusher = require('pusher');
// TO DO END
// TO DO: USE THIS SOMEWHERE
// const passportSetup = require('./passportsetup');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['cookieisawesome'],
  }),
);
// move this to controllers [[1]]
const pusher = new Pusher({
  appId: process.env.push_app_id,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  encrypted: true,
});

app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('my-channel', 'my-event', {
    code: payload,
  });
  res.send(payload);
});

app.set('port', process.env.PORT || 3001);

app.options('/google', cors());
app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
  (req, res) => {
    if (req.method === 'OPTIONS') {
      req.statusCode(200);
    }
  },
);
// end of [[1]]
app.use('/', require('./routes'));

app.listen(app.get('port'), () => {
  console.log(`Server at: http://localhost:${app.get('port')}/`);
});

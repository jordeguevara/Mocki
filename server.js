const express = require("express");
const app = express();
require("dotenv").config();
global.fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { createUserTable, createLogins } = require("./db/awsDB");
const {initalizeApp} = require('./util');

const Pusher = require('pusher');

var cors = require('cors')
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.push_app_id,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  encrypted: true
});

app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('my-channel', 'my-event', {
    "code": payload
  });
  res.send(payload)
});



app.set("port", process.env.PORT || 3001);
// initalizeApp();

app.use("/", require("./routes"));

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}/`);
});

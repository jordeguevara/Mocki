const express = require("express");
const app = express();
require("dotenv").config();
global.fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { createUserTable, createLogins } = require("./db/awsDB");
const {initalizeApp} = require('./util');
var cors = require('cors')
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);
// initalizeApp();

app.use("/", require("./routes"));

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}/`);
});

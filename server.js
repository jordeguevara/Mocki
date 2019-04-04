const express = require("express");
const app = express();
require('dotenv').config()
var AWS = require("aws-sdk");

app.set("port", process.env.PORT || 3001);

const AWS_ACESSS_KEY = process.env.aws_access_key;
const AWS_SECRET_KEY = process.env.aws_secret_key;

const AWSConfig = {
    accessKeyId: AWS_ACESSS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: "us-west-2",
    endpoint: "http://localhost:8000"
}

AWS.config.update(AWSConfig);


app.listen(app.get("port"), () => {
    console.log(`Server at: http://localhost:${app.get("port")}/`);
});
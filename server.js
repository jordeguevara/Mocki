const express = require("express");
const app = express();
require("dotenv").config();
var AWS = require("aws-sdk");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

app.set("port", process.env.PORT || 3001);

const AWS_ACESSS_KEY = process.env.aws_access_key;
const AWS_SECRET_KEY = process.env.aws_secret_key;

const AWSConfig = {
  accessKeyId: AWS_ACESSS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "us-west-1"
};
AWS.config.update(AWSConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

function isThereUserTable() {}

const createUserTable = (callback) => {
  var dynamoDB = new AWS.DynamoDB();
  var params = {
    TableName: "Users",
    KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  dynamoDB.createTable(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
};


createUserTable();


  //=======

  const addNewUser = (user) =>{
    let docClient = new AWS.DynamoDB.DocumentClient();
    const table = "Users";
    const email = user.email;
    var userParams = {
        TableName:table,
        Item:{
          email: email
        }
    };

    console.log("Adding a new Email to User Tabls...");
    docClient.put(userParams, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
  }
 



  //======

const createLogins = function(callback) {
    var dynamoDB = new AWS.DynamoDB();

    var params = {
      TableName: "Logins",
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" },
        { AttributeName: "timestamp", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" },
        { AttributeName: "timestamp", AttributeType: "N" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    dynamodb.createTable(params, callback);
  };
  const bob = {email:'bob@gmail.com'}
  addNewUser(bob);

  
  app.use('/',require('./routes'))




//==== Amazon congitito 
// TO DO: Clean this is fam
// UserInfo = {perferreeduserName,username,password,email}
const signUp = (userInfo) => {

var poolData = {
    UserPoolId : process.env.aws_pool_id, // your user pool id here
    ClientId : process.env.aws_app_client_id// your app client id here strange behavior
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : 'jord440', // your username here
    Pool : userPool
};

//===sign up
var attributeList = [];
 
var dataEmail = {
    Name : 'email',
    Value : 'jordeguevara@gmail.com' // your email here
};

var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);


var dataName = {
    Name : 'preferred_username',
    Value : 'jguavvaa' // your email here
};

var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

 
attributeList.push(attributeEmail);
attributeList.push(attributeName)

 
var cognitoUser;


var password = 'Jasong12!'
userPool.signUp('username', password, attributeList, null, function(err, result){
    if (err) {
        // console.log("im in error")
        console.log(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
});
}
// end sign up
//confirm user 


//==










 

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}/`);
});

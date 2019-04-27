require("dotenv").config();
var AWS = require("aws-sdk");
const AWS_ACESSS_KEY = process.env.aws_access_key;
const AWS_SECRET_KEY = process.env.aws_secret_key;

const AWSConfig = {
    accessKeyId: AWS_ACESSS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: "us-west-1"
  };
  AWS.config.update(AWSConfig);

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
    
        dynamoDB.createTable(params, callback);
      };
  
    docClient.put(userParams, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
  }

  module.exports = {
    createUserTable,
    addNewUser,
}
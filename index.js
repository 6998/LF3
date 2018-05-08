const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const async = require('async');
const fs = require('fs');
const path = require('path');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const randomstring = require("randomstring");
const dynamoose = require('dynamoose');
const elasticbeanstalk = new AWS.ElasticBeanstalk();

exports.handler = (event, context, callback) => {

  console.log( event)

  const MessageAttributes = {
    User: {
      DataType: "String",
      StringValue: event.user
    },
    ProjectName: {
      DataType: "String",
      StringValue: event.projectName
    },
    ProjectId: {
      DataType: "String",
      StringValue: event.projectId
    },
    S3key: {
      DataType: "String",
      StringValue: event.S3key
    },
  };

  var params = {
    DelaySeconds: 1,
    MessageAttributes,
    MessageBody: "Run",
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/906385631751/ml-runner"
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("sendMessage with sqs:", err);
    } else {
      console.log("added new run to the queue")
    }
    return callback(null, true);
  });

};


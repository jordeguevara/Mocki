// @flow
const mongoose = require('mongoose');

const { Schema } = mongoose;

const interviewSchema = new Schema({
  interviewID: String,
  interviewerID: String,
  intervieweeID: String,
  code: String,
  completed: Boolean,

});

const Interview = mongoose.model('interview', interviewSchema);

module.exports = Interview;

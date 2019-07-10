const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  interviewID: String,
  interviewerID: String,
  intervieweeID: String,
  code: String,
  completed: Boolean,

});

const Interview = mongoose.model("interview", userSchema);

module.exports = Interview;

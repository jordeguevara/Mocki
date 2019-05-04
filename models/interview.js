const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  interviewID: String,
  interviewerID: String,
  code: String
});

const Interview = mongoose.model("interview", userSchema);

module.exports = Interview;

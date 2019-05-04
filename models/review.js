const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  interviewID: String,
  interviewerID: String,
  problemSolving: Number,
  technicalCommunincation: Number,
  strengths: String,
  improvement: String,
  interviewerRating: Number
});

const Review = mongoose.model("review", userSchema);

module.exports = Review;

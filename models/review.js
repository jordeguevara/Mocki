// @flow
const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  interviewID: String,
  interviewerID: String,
  problemSolving: Number,
  technicalCommunincation: Number,
  strengths: String,
  improvement: String,
  interviewerRating: Number,
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;

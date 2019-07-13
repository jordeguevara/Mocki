// @flow
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  googleID: String,
  LinkedInID: String,
  GitHubID: String,
  password: String,
  level: Number,
  firstTimeUser: Boolean,
});

const User = mongoose.model('user', userSchema);

module.exports = User;

// @flow
const mongoose = require('mongoose');

const { Schema } = mongoose;

const LobbySchema = new Schema({
  name: String,
  availableUser: Array,
  matchedUsers: Array,
  lobby: Array,
});

const Lobby = mongoose.model('Lobby', LobbySchema);

module.exports = Lobby;

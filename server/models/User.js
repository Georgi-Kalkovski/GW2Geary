const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  apikeys: {
    type: [apiKeySchema],
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
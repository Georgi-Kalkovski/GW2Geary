const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ], apiKeys: [
      {
        id: {
          type: String,
          required: false 
        },
        active: {
          type: Boolean,
          default: false 
        }
      }
    ]
  })
);

module.exports = User;
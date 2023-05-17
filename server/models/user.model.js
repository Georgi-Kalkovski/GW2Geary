const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  apiKeys: [
    {
      _id: {
        type: String,
        required: false,
        unique: true,
      },
      active: {
        type: Boolean,
        default: false
      }
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
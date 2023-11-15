const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    unique: false,
    sparse: true
  },
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
        unique: false,
        sparse: true
      },
      accountName: {
        type: String,
        unique: true,
        sparse: true
      },
      active: {
        type: Boolean,
        default: false
      },
      characters: [
        {
          name: String,
          race: String,
          profession: String,
          level: Number,
          gender: String,
          active: {
            type: Boolean,
            default: true,
            unique: false,
            sparse: true
          },
        }
      ]
    }
  ],
  storedBuilds: [
    {
      char: String,
      id: String,
      profession: String,
      spec: String,
      creationDate: {
        type: Date,
        default: Date.now
      },
      _id: false
    }
  ],
  resetToken: String,
  resetTokenExpires: Date
}, { versionKey: false });

const User = mongoose.model("User", UserSchema);

module.exports = User;

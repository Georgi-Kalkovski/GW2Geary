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
        unique: true,
        default: false
      },
      accountName: {
        type: String,
        unique: true,
        default: false
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
          level: Number
        }
      ]
    }
  ],

}, { versionKey: false });

const User = mongoose.model("User", UserSchema);

module.exports = User;
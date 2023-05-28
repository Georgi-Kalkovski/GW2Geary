const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
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
        unique: false,
        default: false
      },
      accountName: {
        type: String,
        unique: true,
        default: false
      },
      fractal_level: {
        type: Number,
        default: false
      },
      mastery_points: {
        type: Number,
        default: false
      },
      world: {
        type: String,
        default: false
      },
      wvw_rank: {
        type: Number,
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
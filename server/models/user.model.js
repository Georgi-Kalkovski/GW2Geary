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
    ]
  })
);

module.exports = User;


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   roles: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Role"
//     }
//   ],
//   apiKeys: [
//     {
//       id: {
//         type: String,
//         required: false // Set required to false to make it optional
//       },
//       active: {
//         type: Boolean,
//         default: false // Set default value to false
//       }
//     }
//   ]
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
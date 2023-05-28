const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = async (req, res, next) => {
  try {

    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted
};

module.exports = verifySignUp;

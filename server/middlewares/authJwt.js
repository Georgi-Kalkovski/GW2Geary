const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    
    req.token = decoded;
    next();
  });
};

verifySameUser = (req, res, next) => {
  const { userId } = req.params;
  const { token } = req;

  if (token.id !== userId) {
    return res.status(403).send({ message: "Forbidden: Access token does not match user" });
  }
  next();
}

isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      return Role.find({ _id: { $in: user.roles } });
    })
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Admin Role!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

isModerator = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      return Role.find({ _id: { $in: user.roles } });
    })
    .then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({ message: "Require Moderator Role!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const authJwt = {
  verifyToken,
  verifySameUser,
  isAdmin,
  isModerator
};

module.exports = authJwt;

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Sign Up
exports.signup = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });

      user.roles = roles.map((role) => role._id);
      await user.save();

      res.send({ message: "User was registered successfully!" });
    } else {
      const role = await Role.findOne({ name: "user" });

      user.roles = [role._id];
      await user.save();

      res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Sign In
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    res.status(200).send({
      id: user._id,
      email: user.email,
      roles: authorities,
      accessToken: token,
      apiKeys: user.apiKeys,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// create API key
exports.createApiKey = async (req, res) => {
  try {
    const { userId } = req.params;
    const { apiKey } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    user.apiKeys.push({ _id: apiKey, active: true });
    await user.save();

    res.status(201).send({ message: "API key created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

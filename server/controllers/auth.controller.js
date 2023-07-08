const config = require("../config/auth.config");
const axios = require('axios');
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign Up
exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
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
    const user = await User.findOne({ username: req.body.username }).populate(
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
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      apiKeys: user.apiKeys,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Change Username
exports.changeUsername = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;

    const user = await User.findByIdAndUpdate(userId, { username: newUsername }, { new: true });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ message: "Username changed successfully!", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Change Email
exports.changeEmail = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newEmail } = req.body;

    const user = await User.findByIdAndUpdate(userId, { email: newEmail }, { new: true });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ message: "Email changed successfully!", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    await user.save();

    res.status(200).send({ message: "Password changed successfully!", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("apiKeys", "_id active");

    res.status(200).send({
      message: "Users retrieved successfully!"
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
    const charactersResponse = await axios.get(`https://api.guildwars2.com/v2/characters?ids=all&access_token=${apiKey}`);
    const accountResponse = await axios.get(`https://api.guildwars2.com/v2/account?access_token=${apiKey}`);
    const account = accountResponse.data;
    const characterData = charactersResponse.data.map(character => ({
      name: character.name,
      race: character.race,
      profession: character.profession,
      level: character.level
    }));
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const existingApiKey = user.apiKeys.find((key) => key._id === apiKey);
    if (existingApiKey) {
      return res.status(400).send({ message: "API key already exists." });
    }
    const apiKeyData = {
      _id: apiKey,
      active: true,
      accountName: account.name,
      characters: characterData
    };

    user.apiKeys.push(apiKeyData);
    await user.save();

    const updatedUser = await User.findById(userId).populate("apiKeys", "_id active");

    res.status(201).send({
      message: "API key created successfully!",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get Api Keys
exports.getApiKeys = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("apiKeys", "_id active");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.status(200).send({
      message: "API keys retrieved successfully!",
      user: user,
    });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update API key status
exports.updateApiKeyStatus = async (req, res) => {
  try {
    const { userId, apiKeyId } = req.params;
    const { active } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const apiKey = user.apiKeys.id(apiKeyId);
    if (!apiKey) {
      return res.status(404).send({ message: "API key Not found." });
    }

    apiKey.active = active;
    await user.save();

    const updatedUser = await User.findById(userId).populate("apiKeys", "_id active");

    res.status(200).send({
      message: "API key status updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete API key
exports.deleteApiKey = async (req, res) => {
  try {
    const { userId, apiKeyId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const apiKeyIndex = user.apiKeys.findIndex((key) => key._id === apiKeyId);
    if (apiKeyIndex === -1) {
      return res.status(404).send({ message: "API key not found." });
    }

    // Remove the API key from the array
    user.apiKeys.splice(apiKeyIndex, 1);

    await user.save();

    const updatedUser = await User.findById(userId).populate(
      "apiKeys",
      "_id active"
    );

    res.status(200).send({
      message: "API key deleted successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error deleting API key:", err);
    res.status(500).send({ message: "Failed to delete API key." });
  }
};

// Get Active API Keys
exports.getActiveApiKeys = async () => {
  try {
    const activeApiKeys = await User.distinct("apiKeys._id", { "apiKeys.active": true });
    return activeApiKeys;
  } catch (err) {
    throw new Error(err.message);
  }
};
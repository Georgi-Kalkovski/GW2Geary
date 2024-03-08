const config = require("../config/auth.config");
const axios = require('axios');
const db = require("../models");
const User = db.user;
const BldSave = db.bldsave;
const FSave = db.fsave;
const EqSave = db.eqsave;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign Up
exports.signup = async (req, res) => {;
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
      expiresIn: '365d', // 1 year
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
      storedBuilds: user.storedBuilds,
      storedFashion: user.storedFashion,
      storedEquipment: user.storedEquipment,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const { name, accessToken } = req.query;

    if (!name || !accessToken) {
      localStorage.removeItem('user');
      return res.status(400).send({ message: "Name and accessToken parameters are required" });
    }

    // Verify the access token
    jwt.verify(accessToken, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized: Invalid access token" });
      }

      const user = await User.findOne({
        'username': name
      })
        .populate('storedBuilds')
        .populate('storedFashion')
        .populate('storedEquipment');

      if (user) {
        if (decoded.id !== user.id) {
          return res.status(403).send({ message: "Forbidden: Access token does not match user" });
        }

        res.status(200).send({
          message: "User retrieved successfully!",
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: accessToken,
          apiKeys: user.apiKeys,
          storedBuilds: user.storedBuilds,
          storedFashion: user.storedFashion,
          storedEquipment: user.storedEquipment,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
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
    if (!newUsername) {
      return res.status(400).send({ message: "newUsername parameter is required" });
    }

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
    if (!newEmail) {
      return res.status(400).send({ message: "newEmail parameter are required" });
    }

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

    if (!newPassword) {
      return res.status(400).send({ message: "newPassword parameter are required" });
    }

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
    const users = await User.find().populate("apiKeys", "_id active").select("-roles -email -username -password -_id -apiKeys._id -resetToken -_id");

    res.status(200).send({
      message: "Users retrieved successfully!",
      users: users,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//Get Account
exports.getAccount = async (req, res) => {
  try {
    const fullUrl = req.originalUrl;

    // Split the URL by '/' and get the last part
    const urlParts = fullUrl.split('name=');
    const lastPart = decodeURIComponent(urlParts[urlParts.length - 1].replace(/\+/g, ' '));

    const foundUser = await User.findOne({
      'apiKeys.accountName': lastPart
    })
      .populate("apiKeys", "_id active accountName characters")
      .select("-roles -email -username -password -_id -apiKeys._id -resetToken -_id -storedBuilds -storedEquipment -storedFashion");

    if (foundUser) {
      const filteredApiKeys = foundUser.apiKeys.filter(apiKey => apiKey.accountName === lastPart);

      foundUser.apiKeys = filteredApiKeys;

      res.status(200).send({
        message: "User retrieved successfully!",
        user: foundUser,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get Character
exports.getCharacter = async (req, res) => {
  try {
    const fullUrl = req.originalUrl;

    // Split the URL by '/' and get the last part
    const urlParts = fullUrl.split('name=');
    const lastPart = decodeURIComponent(urlParts[urlParts.length - 1].replace(/\+/g, ' '));

    const foundUser = await User.findOne({
      'apiKeys.characters.name': lastPart
    })
      .populate("apiKeys", "_id active accountName characters")
      .select("-roles -email -username -password -_id -apiKeys._id -resetToken -_id");

    if (foundUser) {
      const characters = foundUser.apiKeys.reduce((acc, apiKey) => {
        const character = apiKey.characters.find(char => char.name === lastPart);
        if (character) {
          acc.push(character);
        }
        return acc;
      }, []);

      res.status(200).send({
        message: "User and characters retrieved successfully!",
        user: foundUser,
        characters: characters,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get user by email
exports.getEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select("email username");

    if (user) {
      console.log(user);
      res.status(200).send({
        message: "User retrieved successfully!",
        user: [{
          username: user.username,
          email: user.email
        }]
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.error('Error:', err);
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
      level: character.level,
      gender: character.gender
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
    const user = await User.findById(userId).populate("apiKeys", "_id active").select("-roles -resetToken -email -username -password -apiKeys -_id -storedBuilds -storedFashion -storedEquipment");

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

// Refresh all user data
// exports.refreshAllUserData = async (req, res) => {
//   try {
//     // Fetch all users
//     const users = await User.find({});
//     // Loop over each user

//     let startProcessing = false;
//     for (let user of users) {
//       // if (user.username === 'cynni') {
//       //   startProcessing = true;
//       // }
//       // if (!startProcessing) {
//       //   continue;
//       // }

//       // Loop over each API key of the user
//       for (let apiKeyData of user.apiKeys) {

//         // Fetch character data
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Add timeout here
//         const charactersResponse = await axios.get(`https://api.guildwars2.com/v2/characters?ids=all&access_token=${apiKeyData._id}`);
//         if (charactersResponse.status !== 200 || charactersResponse.data.text === "invalid key") {
//           console.error(`Error fetching character data for user ${user.username}: ${charactersResponse.status} - ${charactersResponse.statusText}`);
//           console.error(charactersResponse.data); // Log the error response
//           continue; // Skip to the next API key if this one is invalid
//         }
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Add timeout here
//         const accountResponse = await axios.get(`https://api.guildwars2.com/v2/account?access_token=${apiKeyData._id}`);
//         if (accountResponse.status !== 200 || accountResponse.data.text === "invalid key") {
//           console.error(`Error fetching account data for user ${user.username}: ${accountResponse.status} - ${accountResponse.statusText}`);
//           console.error(accountResponse.data); // Log the error response
//           continue; // Skip to the next API key if this one is invalid
//         }
//         const account = accountResponse.data;
//         const characterData = charactersResponse.data.map(character => ({
//           name: character.name,
//           profession: character.profession,
//           race:character.race,
//           level: character.level,
//           gender: character.gender,
//         }));

//         // Update API key data
//         apiKeyData.accountName = account.name;
//         apiKeyData.characters = characterData;

//         // console.log the result of the save
//         console.log("Updated user data:", user.username, account.name);
//       }
//       // Save the updated user data outside the inner loop
//       await user.save();
//     }

//     // Send response
//     res.status(200).send({
//       message: "All user data refreshed successfully!"
//     });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

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

// Update API key status
exports.updateCharacterStatus = async (req, res) => {
  try {
    const { userId, apiKeyId, characterId } = req.params;
    const { active } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const apiKey = user.apiKeys.id(apiKeyId);
    if (!apiKey) {
      return res.status(404).send({ message: "API key Not found." });
    }
    apiKey.characters.find(x => x._id.toString() === characterId).active = active;
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

// Set Build
exports.setBuild = async (req, res) => {
  try {
    const { owner, name, profession, spec, bldname, skills, aquatic_skills, specializations } = req.body;
    const newBuild = new BldSave({
      owner,
      name,
      profession,
      spec,
      bldname,
      skills,
      aquatic_skills,
      specializations,
    });

    const savedBuild = await newBuild.save();

    const user = await User.findById(owner);
    user.storedBuilds.push({ char: name, id: savedBuild._id, profession: savedBuild.profession, spec: savedBuild.spec, bldname: savedBuild.bldname });

    await user.save();

    res.status(201).json(savedBuild);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get Build
exports.getBuild = async (req, res) => {
  try {
    const { name } = req.params;
    const { id } = req.params;
    const build = await BldSave.findOne({ _id: id, name: name });
    if (!build) {
      return res.status(404).send({ message: "Build Not found." });
    }

    res.status(200).send({
      message: "Build retrieved successfully!",
      build: build,
    });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete Build
exports.deleteBuild = async (req, res) => {
  try {
    const { storedBuildId } = req.params;

    const user = await User.findOneAndUpdate(
      { 'storedBuilds.id': storedBuildId },
      { $pull: { storedBuilds: { id: storedBuildId } } }
    );

    await BldSave.findOneAndDelete({ _id: storedBuildId });

    return res.status(200).json({ message: 'Stored build deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Set Fashion
exports.setFashion = async (req, res) => {
  try {
    const { owner, name, gender, race, profession, equipment } = req.body;

    const updatedEquipment = equipment.map(eq => {
      if (eq.dyes) {
        eq.dyes = eq.dyes.map(dye => (dye && dye.id) ? dye.id : null);
      }
      if (Array.isArray(eq.infusions) && eq.infusions.length > 0) {
        eq.infusions = eq.infusions.map(infusion => (infusion && infusion.id) ? infusion.id : null);
      }
      return eq;
    });

    const newFashion = new FSave({
      owner,
      name,
      gender,
      race,
      profession,
      equipment: updatedEquipment,
    });

    const savedFashion = await newFashion.save();

    const user = await User.findById(owner);
    user.storedFashion.push({
      char: name,
      id: savedFashion._id,
      gender: savedFashion.gender,
      race: savedFashion.race,
      profession: savedFashion.profession,
    });

    await user.save();

    res.status(200).json(savedFashion);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get Fashion
exports.getFashion = async (req, res) => {
  try {
    const { name } = req.params;
    const { id } = req.params;
    const fashion = await FSave.findOne({ _id: id, name: name });
    if (!fashion) {
      return res.status(404).send({ message: "Fashion Not found." });
    }

    res.status(200).send({
      message: "Fashion retrieved successfully!",
      fashion: fashion,
    });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete Fashion
exports.deleteFashion = async (req, res) => {
  try {
    const { storedFashionId } = req.params;

    const user = await User.findOneAndUpdate(
      { 'storedFashion.id': storedFashionId },
      { $pull: { storedFashion: { id: storedFashionId } } }
    );

    await FSave.findOneAndDelete({ _id: storedFashionId });

    return res.status(200).json({ message: 'Stored fashion deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Set Equipment
exports.setEquipment = async (req, res) => {
  try {
    const { owner, name, gender, race, profession, relic, powerCore, eqname, equipment } = req.body;

    const updatedEquipment = equipment.map(eq => {
      if (eq.dyes) {
        eq.dyes = eq.dyes.map(dye => (dye && dye.id) ? dye.id : null);
      }
      if (Array.isArray(eq.infusions) && eq.infusions.length > 0) {
        eq.infusions = eq.infusions.map(infusion => (infusion && infusion.id) ? infusion.id : null);
      }
      if (Array.isArray(eq.upgrades) && eq.upgrades.length > 0) {
        eq.upgrades = eq.upgrades.map(upgrade => (upgrade && upgrade.id) ? upgrade.id : null);
      }
      return eq;
    });

    const newEquipment = new EqSave({
      owner,
      name,
      gender,
      race,
      profession,
      relic,
      powerCore,
      eqname,
      equipment: updatedEquipment,
    });

    const savedEquipment = await newEquipment.save();

    const user = await User.findById(owner);
    user.storedEquipment.push({
      char: name,
      id: savedEquipment._id,
      gender: savedEquipment.gender,
      race: savedEquipment.race,
      profession: savedEquipment.profession,
      eqname: savedEquipment.eqname
    });

    await user.save();

    res.status(200).json(savedEquipment);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get Equipment
exports.getEquipment = async (req, res) => {
  try {
    const { name } = req.params;
    const { id } = req.params;
    const equipment = await EqSave.findOne({ _id: id, name: name });
    if (!equipment) {
      return res.status(404).send({ message: "Equipment Not found." });
    }

    res.status(200).send({
      message: "Equipment retrieved successfully!",
      equipment: equipment,
    });
    return;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete Equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const { storedEquipmentId } = req.params;

    const user = await User.findOneAndUpdate(
      { 'storedEquipment.id': storedEquipmentId },
      { $pull: { storedEquipment: { id: storedEquipmentId } } }
    );

    await EqSave.findOneAndDelete({ _id: storedEquipmentId });

    return res.status(200).json({ message: 'Stored equipment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

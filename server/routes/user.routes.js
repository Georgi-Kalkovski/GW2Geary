const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user information
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { _id, username, createdAt, apiKeys } = user;
    res.json({ _id, username, createdAt, apiKeys });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error retrieving user information' });
  }
});

// Update user information
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    await user.save();

    const { _id, username: updatedUsername, createdAt, apiKeys } = user;
    res.json({ _id, username: updatedUsername, createdAt, apiKeys });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error updating user information' });
  }
});

module.exports = router;

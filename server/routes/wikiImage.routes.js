const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const apiUrl = req.query.url;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in proxy server:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;

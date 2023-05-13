const express = require('express');
const axios = require('axios');
const router = express.Router();
const { apiKeys, baseUrl } = require('./config');

router.get('/', async (req, res) => {
  const data = [];
  for (let i = 0; i < apiKeys.length; i++) {
    try {
      data.push((await axios.get(`${baseUrl}/account?${apiKeys[i]}`)).data)
    } catch (error) {
      console.log(`Error with API key ${apiKeys[i]}`);
    }
  }

  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Error fetching data from API' });
  }
  return
});

module.exports = router;

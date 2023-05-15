const express = require('express');
const axios = require('axios');
const router = express.Router();
const { apiKeys, baseUrl } = require('./config.routes');

router.get('/', async (req, res) => {
  const accounts = [];
  for (let i = 0; i < apiKeys.length; i++) {
    try {
      const account = (await axios.get(`${baseUrl}/account?${apiKeys[i]}`)).data;
      const character = (await axios.get(`${baseUrl}/characters?ids=all&${apiKeys[i]}`)).data;
      accounts.push({ account: account, chars: character});
    } catch (error) {
      console.log(`Error with API key ${apiKeys[i]}`);
    }
  }

  if (accounts.length > 0) {
    res.json(accounts);
  } else {
    res.status(500).json({ error: 'Error fetching data from API' });
  }
});

module.exports = router;
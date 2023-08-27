const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const url = req.query.url;
    try {
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      try {
        const updatedUrl = url + '_Skin';
        const response = await axios.get(updatedUrl);
        res.send(response.data);
      } catch (retryError) {
        console.error('Error retrying URL with "_Skin":', retryError.message);
        res.status(500).send('Error fetching URL');
      }
    }
  });

module.exports = router;

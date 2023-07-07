const express = require('express');
const axios = require('axios');
const router = express.Router();
const { apiKey, baseUrl } = require('./config.routes');

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`/characters?${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

router.get('/character/:name', async (req, res) => {
    const { name } = req.params;
    const formattedName = name.replaceAll('_', ' ');
  
    try {
      // Make the requests to the Guild Wars 2 API
      const charFound = (await axios.get(`${baseUrl}/characters/${formattedName.replaceAll(' ', '%20')}?access_token=${req.user.accessToken}&v=latest`)).data;
      const accFound = (await axios.get(`${baseUrl}/account?access_token=${req.user.accessToken}&v=latest`)).data;
      const mastery_points = (await axios.get(`${baseUrl}/account/mastery/points?access_token=${req.user.accessToken}`)).data;
      let world;
      if (accFound && accFound.world) {
        world = (await axios.get(`${baseUrl}/worlds/${accFound.world}`)).data;
      }
  
      // Send the response back to the frontend
      res.json({
        character: charFound,
        account: accFound,
        mastery: mastery_points.totals.reduce((acc, x) => acc + x.spent, 0),
        world: world.name
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`${baseUrl}/characters/${name}?${apiKey}&v=latest`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { apiKey, baseUrl } = require('./config.routes');

router.get('/', async (req, res) => {
    const { access_token } = req.query;
    try {
        const response = await axios.get(`https://api.guildwars2.com/v2/account?access_token=${access_token}&v=latest`);
        const accountData = response.data;
        res.json(accountData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

router.get('/mastery/points', async (req, res) => {
    const { access_token } = req.query;
    try {
        const response = await axios.get(`https://api.guildwars2.com/v2/account/mastery/points?access_token=${access_token}`);
        const masteryPoints = response.data;
        res.json(masteryPoints);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiKey = '?access_token=' + process.env.API_KEY;
const baseUrl = 'https://api.guildwars2.com/v2';

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/account${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

router.get('/mastery/points', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/account/mastery/points${apiKey}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { apiKey, baseUrl } = require('./config.routes');

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/characters?${apiKey}`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
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
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

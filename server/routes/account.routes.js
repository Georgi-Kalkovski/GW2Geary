const express = require('express');
const axios = require('axios');
const router = express.Router();
const { apiKey, baseUrl } = require('./config.routes');

router.get('/', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key']; // Retrieve the API key from request headers
        // Use the API key for further processing

        const response = await axios.get(`${baseUrl}/account?${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

router.get('/mastery/points', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key']; // Retrieve the API key from request headers
        // Use the API key for further processing

        const response = await axios.get(`${baseUrl}/account/mastery/points?${apiKey}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { baseUrl } = require('./config.routes');
const User = require('../models/user.model');

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    const user = await User.find(
        { 'apiKeys.accountName': name },
        { 'apiKeys.$': 1 }
    );

    if (user && user.length > 0) {
        const apiKey = user[0].apiKeys[0];
        const apiKeyId = apiKey._id;

        try {
            const response = await axios.get(`${baseUrl}/account?access_token=${apiKeyId}&v=latest`);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data from API' });
        }
    }
});

router.get('/mastery/points/:name', async (req, res) => {
    const { name } = req.params;
    const user = await User.find(
        { 'apiKeys.accountName': name },
        { 'apiKeys.$': 1 }
    );
    if (user && user.length > 0) {
        const apiKey = user[0].apiKeys[0];
        const apiKeyId = apiKey._id;

        try {
            const response = await axios.get(`${baseUrl}/account/mastery/points?access_token=${apiKeyId}&v=latest`);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data from API' });
        }
    }
});

module.exports = router;

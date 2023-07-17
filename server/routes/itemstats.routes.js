const express = require('express');
const axios = require('axios');
const router = express.Router();
const { baseUrl } = require('./config.routes');

router.get('/:items', async (req, res) => {
    try {
        const { items } = req.params;
        const response = await axios.get(`${baseUrl}/itemstats?ids=${items}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

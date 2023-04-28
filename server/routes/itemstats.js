const express = require('express');
const axios = require('axios');
const router = express.Router();

const baseUrl = 'https://api.guildwars2.com/v2';

router.get('/:item', async (req, res) => {
    try {
        const { item } = req.params;
        const response = await axios.get(`${baseUrl}/itemstats/${item}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

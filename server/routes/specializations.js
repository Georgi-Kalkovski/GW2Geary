const express = require('express');
const axios = require('axios');
const router = express.Router();

const baseUrl = 'https://api.guildwars2.com/v2';

router.get('/:spec', async (req, res) => {
    try {
        const { spec } = req.params;
        const response = await axios.get(`${baseUrl}/specializations/${spec}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;
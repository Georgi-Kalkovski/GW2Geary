const express = require('express');
const axios = require('axios');
const router = express.Router();

const baseUrl = 'https://api.guildwars2.com/v2';

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${baseUrl}/worlds?ids=${id}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;
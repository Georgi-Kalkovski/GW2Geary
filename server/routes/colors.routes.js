const express = require('express');
const axios = require('axios');
const router = express.Router();
const { baseUrl } = require('./config.routes');

router.get('/:colors', async (req, res) => {
    try {
        const { colors } = req.params;
        const response = await axios.get(`${baseUrl}/colors?ids=${colors}`);
        if (response) {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

module.exports = router;

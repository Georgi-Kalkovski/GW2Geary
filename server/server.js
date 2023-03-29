require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3001;
const apiKey = process.env.API_KEY;

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/account/mastery/points', async (req, res) => {
    try {
        const response = await axios.get(`https://api.guildwars2.com/v2/account/mastery/points?access_token=${apiKey}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/account', async (req, res) => {
    try {
        const response = await axios.get(`https://api.guildwars2.com/v2/account?access_token=${apiKey}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/characters', async (req, res) => {
    try {
        const response = await axios.get(`https://api.guildwars2.com/v2/characters?access_token=${apiKey}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/characters/:name', async (req, res) => {
    try {
        const characterName = req.params.name;
        const response = await axios.get(`https://api.guildwars2.com/v2/characters/${characterName}?access_token=${apiKey}&v=2021-07-15T13:00:00.000Z`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/professions/:profession', async (req, res) => {
    try {
        const characterProfession = req.params.profession;
        const response = await axios.get(`https://api.guildwars2.com/v2/professions/${characterProfession}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/worlds/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://api.guildwars2.com/v2/worlds?ids=${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3001;
const apiKey = '?access_token=' + process.env.API_KEY;
const baseUrl = 'https://api.guildwars2.com/v2';

// Enable CORS
app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/account', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/account${apiKey}`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/account/mastery/points', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/account/mastery/points${apiKey}`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/characters', async (req, res) => {
    try {
        const response = await axios.get(`${baseUrl}/characters${apiKey}`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/characters/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const response = await axios.get(`${baseUrl}/characters/${name}${apiKey}&v=2021-07-15T13:00:00.000Z`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/professions/:profession', async (req, res) => {
    try {
        const {profession} = req.params;
        const response = await axios.get(`${baseUrl}/professions/${profession}`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});

app.get('/api/worlds/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const response = await axios.get(`${baseUrl}/worlds?ids=${id}`);
        res.json(response.data);
    } catch (error) {
        //res.status(500).json({ error: 'Error fetching data from API' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

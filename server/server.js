require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3001;

// Enable CORS
app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Require routes
const accountRouter = require('./routes/account');
const charactersRouter = require('./routes/characters');
const itemsRouter = require('./routes/items');
const itemstatsRouter = require('./routes/itemstats');
const professionsRouter = require('./routes/professions');
const skillsRouter = require('./routes/skills');
const skinsRouter = require('./routes/skins');
const specializationsRouter = require('./routes/specializations');
const traitsRouter = require('./routes/traits');
const worldsRouter = require('./routes/worlds');

// Register routes
app.use('/api/account', accountRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/itemstats', itemstatsRouter);
app.use('/api/professions', professionsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/skins', skinsRouter);
app.use('/api/specializations', specializationsRouter);
app.use('/api/traits', traitsRouter);
app.use('/api/worlds', worldsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
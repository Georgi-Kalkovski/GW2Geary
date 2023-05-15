require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// Enable CORS
app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Require routes
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const accountRouter = require('./routes/account');
const accountsRouter = require('./routes/accounts');
const charactersRouter = require('./routes/characters');
const charactersAllRouter = require('./routes/charactersAll');
const itemsRouter = require('./routes/items');
const professionsRouter = require('./routes/professions');
const professionsAllRouter = require('./routes/professionsAll');
const skillsRouter = require('./routes/skills');
const skinsRouter = require('./routes/skins');
const specializationsRouter = require('./routes/specializations');
const traitsRouter = require('./routes/traits');
const worldsRouter = require('./routes/worlds');

// Register routes
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/account', accountRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/charactersAll', charactersAllRouter);
app.use('/api/items', itemsRouter);
app.use('/api/professions', professionsRouter);
app.use('/api/professionsAll', professionsAllRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/skins', skinsRouter);
app.use('/api/specializations', specializationsRouter);
app.use('/api/traits', traitsRouter);
app.use('/api/worlds', worldsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
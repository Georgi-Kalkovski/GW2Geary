require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');

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
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use consolidated routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const router = express.Router();

// Import route handlers
const registerHandler = require('./register.routes');
const loginHandler = require('./login.routes');
const userHandler = require('./user.routes');
const accountRoutes = require('./account.routes');
const accountsHandler = require('./accounts.routes');
const charactersHandler = require('./characters.routes');
const charactersAllHandler = require('./charactersAll.routes');
const itemsHandler = require('./items.routes');
const professionsHandler = require('./professions.routes');
const professionsAllHandler = require('./professionsAll.routes');
const skillsHandler = require('./skills.routes');
const skinsHandler = require('./skins.routes');
const specializationsHandler = require('./specializations.routes');
const traitsHandler = require('./traits.routes');
const worldsHandler = require('./worlds.routes');

// Register routes
router.use('/register', registerHandler);
router.use('/login', loginHandler);
router.use('/user', userHandler);
router.use('/account', accountRoutes);
router.use('/accounts', accountsHandler);
router.use('/characters', charactersHandler);
router.use('/charactersAll', charactersAllHandler);
router.use('/items', itemsHandler);
router.use('/professions', professionsHandler);
router.use('/professionsAll', professionsAllHandler);
router.use('/skills', skillsHandler);
router.use('/skins', skinsHandler);
router.use('/specializations', specializationsHandler);
router.use('/traits', traitsHandler);
router.use('/worlds', worldsHandler);

module.exports = router;
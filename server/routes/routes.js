const express = require('express');
const router = express.Router();

// Import route Routess
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const accountRoutes = require('./account.routes');
const accountsRoutes = require('./accounts.routes');
const charactersRoutes = require('./characters.routes');
const charactersAllRoutes = require('./charactersAll.routes');
const itemsRoutes = require('./items.routes');
const itemstatsRoutes = require('./itemstats.routes');
const professionsRoutes = require('./professions.routes');
const professionsAllRoutes = require('./professionsAll.routes');
const skillsRoutes = require('./skills.routes');
const colorsRoutes = require('./colors.routes');
const skinsRoutes = require('./skins.routes');
const specializationsRoutes = require('./specializations.routes');
const traitsRoutes = require('./traits.routes');
const worldsRoutes = require('./worlds.routes');
const wikiImageRoutes = require('./wikiImage.routes');

// Register routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/account', accountRoutes);
router.use('/accounts', accountsRoutes);
router.use('/a', accountsRoutes);
router.use('/characters', charactersRoutes);
router.use('/c', charactersRoutes);
router.use('/charactersAll', charactersAllRoutes);
router.use('/items', itemsRoutes);
router.use('/itemstats', itemstatsRoutes);
router.use('/professions', professionsRoutes);
router.use('/professionsAll', professionsAllRoutes);
router.use('/skills', skillsRoutes);
router.use('/colors', colorsRoutes);
router.use('/skins', skinsRoutes);
router.use('/specializations', specializationsRoutes);
router.use('/traits', traitsRoutes);
router.use('/worlds', worldsRoutes);
router.use('/wikiImage', wikiImageRoutes);

module.exports = router;

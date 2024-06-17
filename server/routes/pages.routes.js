const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const pathToIndex = path.join(__dirname, "../../client/build/index.html");
const raw = fs.readFileSync(pathToIndex, 'UTF8');
let pageTitle = '';
let pageDescription = '';
let pageOgUrl = '';

router.get("/", (req, res) => {
    pageTitle = "GW2Geary - Search";
    pageDescription = `Discover and Inspect GW2 Accounts and Characters.
        Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate tool to explore and inspect Guild Wars 2 accounts and characters.
        With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
        Want to show your gear(armour & weapons) to others? Use GW2Geary!`;
    pageOgUrl = "https://gw2geary.com/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
});

router.get('/login', (req, res) => {
    pageTitle = "GW2Geary - Login";
    pageDescription = `Login/Sign in to access your profile's information or reset password using your email.
        By Login you'll have access to your API Keys, hide/show/delete them, as well as hide/show your characters separately.
        You'll also be able to manipulate your profile info (change username, change email, change password, delete user).`;
    pageOgUrl = "https://gw2geary.com/login/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/register', (req, res) => {
    pageTitle = "GW2Geary - Register";
    pageDescription = `Register/Sign up to create a profile's information.
        By signing up you'll be able to register API Keys, hide/show/delete them, as well as hide/show your characters separately.
        You'll also be able to manipulate your profile info (change username, change email, change password, delete user).`;
    pageOgUrl = "https://gw2geary.com/register/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/news', (req, res) => {
    pageTitle = "GW2Geary - News";
    pageDescription = "All the News about GW2Geary are here! Latest news: Added Relic and Power Core to the character's preview.";
    pageOgUrl = "https://gw2geary.com/news/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/about', (req, res) => {
    pageTitle = "GW2Geary - About";
    pageDescription = `Read the About page of GW2Geary, a dedicated GW2 armory. Your ultimate inspect tool to explore and inspect Guild Wars 2 accounts and characters.
        With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
        Want to show your gear(armour & weapons) to others? Use GW2Geary!`;
    pageOgUrl = "https://gw2geary.com/about/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/contacts', (req, res) => {
    pageTitle = "GW2Geary - Contacts";
    pageDescription = `Write us a message if you have a question, an idea or just want to chat.`;
    pageOgUrl = "https://gw2geary.com/contacts/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/profile', (req, res) => {
    pageTitle = "GW2Geary - Profile";
    pageDescription = `The personal Profile page. Here you can manipulate your user information or the api keys.`;
    pageOgUrl = "https://gw2geary.com/profile/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/a/:name', (req, res) => {
    const { name } = req.params;
    const world = req.query.w;
    const frac = req.query.frac;
    const wvw = req.query.wvw;
    const mp = req.query.mp;

    pageTitle = `GW2Geary - ${name ? name.replace('_', ' ') : 'Account'}`;
    pageDescription = `
    ${name ? `Account Name: ${name.replace('_', ' ')}` : ''}
    ${world ? `World: ${world.replace('_', ' ')}` : ''}
    ${mp ? `Mastery Points: ${mp}` : ''}
    ${frac ? `Fractal Level: ${frac}` : ''}
    ${wvw ? `WvW Rank: ${wvw}` : ''}
        `;
    pageOgUrl = `https://gw2geary.com/a/${name}/`;

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/c/:name', (req, res) => {
    const { name } = req.params;
    const acc = req.query.acc;
    const lvl = req.query.lvl;
    const prof = req.query.prof;
    const gen = req.query.gen;
    const race = req.query.race;
    const world = req.query.w;
    const frac = req.query.frac;
    const wvw = req.query.wvw;
    const mp = req.query.mp;
    const spec = req.query.spec;

    pageTitle = `GW2Geary - ${name ? name.replace('_', ' ') : 'Character'}`;
    pageDescription = `
    ${name ? `Character Name: ${name.replace('_', ' ')}` : ''}
    ${gen && race && lvl ? `Basic Info: lvl.${lvl} ${race} ${gen}` : ''}
    ${prof ? `Profession: ${prof}` : ''} ${spec ? `(${spec})` : ''}
    ${acc ? `Account Name: ${acc.replace('_', ' ')}` : ''}
    ${world ? `World: ${world.replace('_', ' ')}` : ''}
    ${mp ? `Mastery Points: ${mp}` : ''}
    ${frac ? `Fractal Level: ${frac}` : ''}
    ${wvw ? `WvW Rank: ${wvw}` : ''}
    `;
    pageOgUrl = `https://gw2geary.com/c/${name}/`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/f/:name/:id', (req, res) => {
    const { name } = req.params;
    const { id } = req.params;
    pageTitle = `GW2Geary - ${name ? name.replace('_', ' ') : 'Character'}`;
    pageDescription = `Find more information about the character - ${name ? ' ' + name.replace('_', ' ') : '.'}`;
    pageOgUrl = `https://gw2geary.com/f/${name}/${id}`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/reset-password/:token', (req, res) => {
    pageTitle = `GW2Geary - Reset Password`;
    pageDescription = `Change the password of your user`;
    pageOgUrl = `https://gw2geary.com/reset-password`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/blds/:name/:id', (req, res) => {
    const { name } = req.params;
    const { id } = req.params;

    pageTitle = `GW2Geary Build - ${name ? name.replace('_', ' ') : 'Character'}`;
    pageDescription = `
    This is ${name ? `${name.replace('_', ' ')}` : ''}'s Build.
    `;
    pageOgUrl = `https://gw2geary.com/blds/${name}/${id}`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/fs/:name/:id', (req, res) => {
    const { name } = req.params;
    const { id } = req.params;

    pageTitle = `GW2Geary Fashion - ${name ? name.replace('_', ' ') : 'Character'}`;
    pageDescription = `
    This is ${name ? `${name.replace('_', ' ')}` : ''}'s Fashion.
    `;
    pageOgUrl = `https://gw2geary.com/fs/${name}/${id}`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/eqs/:name/:id', (req, res) => {
    const { name } = req.params;
    const { id } = req.params;

    pageTitle = `GW2Geary Equipment - ${name ? name.replace('_', ' ') : 'Character'}`;
    pageDescription = `
    This is ${name ? `${name.replace('_', ' ')}` : ''}'s Equipment.
    `;
    pageOgUrl = `https://gw2geary.com/eqs/${name}/${id}`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get("/:input", (req, res, next) => {
    const { input } = req.params;
    if (input.startsWith('/static/')) {
        return next();
    }

    pageTitle = "GW2Geary - Error Page";
    pageDescription = `404 - Page Not Found`;
    pageOgUrl = "https://gw2geary.com/";

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl));
});

const replaceMetaData = (pageTitle, pageDescription, pageOgUrl) => {
    return raw
        .replace(/__PAGE_TITLE__/g, pageTitle)
        .replace(/__PAGE_DESCRIPTION__/g, pageDescription)
        .replace(/__PAGE_OGTITLE__/g, pageTitle)
        .replace(/__PAGE_OGDESCRIPTION__/g, pageDescription)
        .replace(/__PAGE_URL__/g, pageOgUrl);
}

module.exports = router;
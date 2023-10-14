const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const pathToIndex = path.join(__dirname, "../../client/build/index.html");
const raw = fs.readFileSync(pathToIndex, 'UTF8');
router.get("/", (req, res) => {
    const pageTitle = "GW2Geary - Search";
    const pageDescription = `Discover and Inspect GW2 Accounts and Characters.
        Welcome to GW2Geary, a dedicated GW2 armory. Your ultimate tool to explore and inspect Guild Wars 2 accounts and characters.
        With GW2Geary, you can dive deep into the details of your favorite players equipment, builds, traits, and skills.
        Want to show your gear(armour & weapons) to others? Use GW2Geary!`;
    const pageOgUrl = "https://gw2geary.com/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
});

router.get('/login', (req, res) => {
    const pageTitle = "GW2Geary - Login";
    const pageDescription = `Login/Sign in to access your profile's information or reset password using your email.
        By Login you'll have access to your API Keys, hide/show/delete them, as well as hide/show your characters separately.
        You'll also be able to manipulate your profile info (change username, change email, change password, delete user).`;
    const pageOgUrl = "https://gw2geary.com/login/"

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
    pageTitle = `GW2Geary - ${name ? name : 'Account'}`;
    pageDescription = `Find more information about the account${name ? ' ' + name : '.'}`;
    pageOgUrl = `https://gw2geary.com/a/${name}/`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/c/:name', (req, res) => {
    const { name } = req.params;
    pageTitle = `GW2Geary - ${name ? name : 'Character'}`;
    pageDescription = `Find more information about the character${name ? ' ' + name : '.'}`;
    pageOgUrl = `https://gw2geary.com/c/${name}/`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/f/:name', (req, res) => {
    const { name } = req.params;
    pageTitle = `GW2Geary - ${name ? name : 'Character'}`;
    pageDescription = `Find more information about the character${name ? ' ' + name : '.'}`;
    pageOgUrl = `https://gw2geary.com/f/${name}/`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get('/reset-password', (req, res) => {
    pageTitle = `GW2Geary - Reset Password`;
    pageDescription = `Change the password of your user`;
    pageOgUrl = `https://gw2geary.com/reset-password`

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
})

router.get("/:input", (req, res) => {
    const pageTitle = "GW2Geary - Error Page";
    const pageDescription = `404 - Page Not Found`;
    const pageOgUrl = "https://gw2geary.com/"

    res.send(replaceMetaData(pageTitle, pageDescription, pageOgUrl))
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
const controller = require("../controllers/auth.controller");
const apiKeys = [];

controller.getActiveApiKeys()
    .then(apis => {
        for (const apiKey of apis) {
            apiKeys.push(`access_token=${apiKey}`);

        }
    })
    .catch(error => console.error(error));

const apiKey = 'access_token=' + process.env.API_KEY;
const baseUrl = 'https://api.guildwars2.com/v2';

module.exports = { apiKey, apiKeys, baseUrl }
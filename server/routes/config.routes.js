const apiKey = 'access_token=' + process.env.API_KEY;
const apiKeys = [
    `access_token=${process.env.API_KEY_1}`,
    `access_token=${process.env.API_KEY_2}`,
    `access_token=${process.env.API_KEY_3}`,
    `access_token=${process.env.API_KEY_4}`
];

const baseUrl = 'https://api.guildwars2.com/v2';

module.exports = { apiKey, apiKeys, baseUrl }
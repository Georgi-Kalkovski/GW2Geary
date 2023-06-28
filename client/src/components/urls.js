
const ip = 'localhost';
const urlBasic = `https://${ip}:3001/api/`;

const URLS = {
    urlAccount: urlBasic + 'account/',
    urlAccounts: urlBasic + 'accounts/',
    urlMasteryPoints: urlBasic + 'account/mastery/points/',
    urlCharacters: urlBasic + 'characters/',
    urlCharactersAll: urlBasic + 'charactersAll/',
    urlProfessions: urlBasic + 'professions/',
    urlProfessionsAll: urlBasic + 'professionsAll/',
    urlWorlds: urlBasic + 'worlds/',
    urlItems: urlBasic + 'items/',
    urlSkins: urlBasic + 'skins/',
    urlSpecs: urlBasic + 'specializations/',
    urlTraits: urlBasic + 'traits/',
    urlSkills: urlBasic + 'skills/'
}

export default URLS;
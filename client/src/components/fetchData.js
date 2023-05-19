import axios from 'axios';
import URLS from './urls';

const fetchData = async (urls, id, apiKey) => {
  let url = {
    account: URLS.urlAccount,
    accounts: URLS.urlAccounts,
    mastery: URLS.urlMasteryPoints,
    characters: URLS.urlCharacters,
    charactersAll: URLS.urlCharactersAll,
    professions: URLS.urlProfessions,
    professionsAll: URLS.urlProfessionsAll,
    worlds: URLS.urlWorlds,
    items: URLS.urlItems,
    skins: URLS.urlSkins,
    specializations: URLS.urlSpecs,
    traits: URLS.urlTraits,
    skills: URLS.urlSkills
  }[urls] || '';

  if (id) { url = url + id }
  if (apiKey) { url = url + apiKey }

  try {
    return (await axios.get(url)).data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
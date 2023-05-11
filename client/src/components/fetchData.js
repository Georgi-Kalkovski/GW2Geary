import axios from 'axios';
import URLS from './urls';

const fetchData = async (urls, id) => {
  let url = {
    account: URLS.urlAccount,
    mastery: URLS.urlMasteryPoints,
    characters: URLS.urlCharacters,
    professions: URLS.urlProfessions,
    worlds: URLS.urlWorlds,
    items: URLS.urlItems,
    itemstats: URLS.urlItemstats,
    skins: URLS.urlSkins,
    specializations: URLS.urlSpecs,
    traits: URLS.urlTraits,
    skills: URLS.urlSkills
  }[urls] || '';

  if (id) { url = url + id }

  try {
    return (await axios.get(url)).data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
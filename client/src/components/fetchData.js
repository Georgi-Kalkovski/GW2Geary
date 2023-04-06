import axios from 'axios';
import { urlAccount, urlMasteryPoints, urlCharacters, urlProfessions, urlWorlds, urlItems, urlSkins, urlSpecs } from './urls';

const fetchData = async (urls, id) => {
  let url = {
    account: urlAccount,
    mastery: urlMasteryPoints,
    characters: urlCharacters,
    professions: urlProfessions,
    worlds: urlWorlds,
    items: urlItems,
    skins: urlSkins,
    specializations: urlSpecs,
  }[urls] || '';

  if (id) { url = url + id }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
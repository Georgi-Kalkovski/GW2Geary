import axios from 'axios';

async function getItem(itemId) {
  try {
    const response = await axios.get(`http://localhost:3001/api/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getItem;
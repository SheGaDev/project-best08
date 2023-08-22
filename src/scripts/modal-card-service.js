// recipe click callback
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

async function getRecipeById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}`);
    return data;
  } catch (error) {
    Notify.failure('Sorry...Please try again!');
  }
}
export { getRecipeById };

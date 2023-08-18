// recipe click callback

import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

const params = {
  recipeID: null,
};

async function getRecipeById(id) {
  params.recipeID = id;
  const { data } = await axios.get(BASE_URL, { params });
  //   console.log({ data });
  return data;
}

export { getRecipeById };

// import getRecipeById from './modal-card-service';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';

const recipeClick = document.querySelector('.button-click');
console.log(recipeClick.name);
recipeClick.addEventListener('click', onRecipeValues);

async function onRecipeValues(e) {
  e.preventDefault();
  const idRecipe = recipeClick.name;
  try {
    const recipeById = await getRecipeById(idRecipe);
    const { title, preview, youtube, tags, rating, time, ingredients, instructions } = recipeById;
  } catch (error) {
    // Notify.failure(error.message);
    console.log(error);
  }
}

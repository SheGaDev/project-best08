import { API } from '.';
import { createMarkup } from '../utils/createMarkup';
import { refs } from './refs';
import { onClickOpenRecipeModal } from '../../scripts/modal-card';

export async function popularRendering() {
  const data = await API.getPopularRecipes();
  const markup = createMarkup(data);
  refs.popularEl.innerHTML = markup;

  const recipeClick = document.querySelector('.popular-list');
  recipeClick.addEventListener('click', onClickOpenRecipeModal);
}

popularRendering()
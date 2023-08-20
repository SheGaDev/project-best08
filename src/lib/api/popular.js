import { API } from '.';
import { createMarkup } from '../utils/createMarkup';
import { refs } from './refs';

export async function popularRendering() {
  const data = await API.getPopularRecipes();
  const markup = createMarkup(data);
  refs.popularEl.innerHTML = markup;
}

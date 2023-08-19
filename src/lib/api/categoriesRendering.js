import { API } from '.';
import { createMarkup } from '../utils/createMarkup';
import { refs } from './refs';

export async function categoriesRendering() {
  const data = await API.fetchCategories();
  const markup = createMarkup(data, 'name');
  refs.categoriesEl.innerHTML = markup;
}

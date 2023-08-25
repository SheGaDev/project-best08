import { API } from '.';
import { createLi } from '../utils/createMarkup';
import { refs } from './refs';

export async function categoriesRendering() {
  const data = await API.fetchCategories();
  const markup = createLi(data);
  refs.categoriesEl.innerHTML = markup;
}

categoriesRendering()
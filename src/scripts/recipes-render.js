import { MakePagination } from './pagination';
import { onClickOpenRecipeModal } from './modal-card';
const { API } = require('@/lib/api');
import Notiflix from 'notiflix';

const pag = new MakePagination();
export const recipesList = document.querySelector('.recipe-cards_wrapper');
const allCategoriesBtn = document.querySelector('.all-categories-btn');
const categoriesList = document.querySelector('.categories-list');

allCategoriesBtn.addEventListener('click', getAllCategories);

populateRecipesList();

export async function populateRecipesList(data) {
  try {
    const activeCategoryItem = categoriesList.querySelector('.is-active');
    if (activeCategoryItem) {
      activeCategoryItem.classList.remove('is-active');
    }

    allCategoriesBtn.classList.add('is-active');
    const recipesData = await API.fetchRecipes(data);
    pag._itemsPerPage = recipesData.perPage;
    pag._totalItems = recipesData.totalPages;
    const recipeResult = recipesData.results;
    const elements = recipeResult.map(renderRecipeCard);
    recipesList.innerHTML = '';
    recipesList.append(...elements);
    //add Listener for open modal recipe window
    const recipeClick = document.querySelector('.recipe-cards_wrapper');
    recipeClick.addEventListener('click', onClickOpenRecipeModal);
    pag.createPag().on('beforeMove', e => {
      pag.renderCategories(e);
    });
  } catch (error) {
    recipesList.innerHTML = `<div class="error-msg-title">Oops...</div>
      <div class="error-msg">An error occured, please try to reload the page</div>`;
    recipesList.style.flexDirection = 'column';
    recipesList.classList.add('show-error-msg');

    Notiflix.Notify.failure('There was an error while loading the recipes');

    console.error('Error fetching recipes;', error);
    throw error;
  }
}

export function renderRecipeCard(recipeData) {
  const recipeCard = document.createElement('li');
  recipeCard.classList.add('recipe-card');
  recipeCard.style.backgroundImage = `linear-gradient(
          1deg,
          rgba(5, 5, 5, 0.6) 0%,
          rgba(5, 5, 5, 0) 100%
        ),
        url(${recipeData.preview})`;

  const recipeCardTitle = document.createElement('h2');
  recipeCardTitle.textContent = recipeData.title;
  recipeCard.appendChild(recipeCardTitle);

  const recipeCardParagraph = document.createElement('p');
  recipeCardParagraph.textContent = recipeData.description;
  recipeCard.appendChild(recipeCardParagraph);

  const svgHeart = document.createElement('span');
  svgHeart.classList.add('favourite-heart');
  svgHeart.innerHTML = `
                        <svg
                          class="heart-icon"
                          width="22px"
                          height="22px"
                          viewBox="0 0 22 22"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z"
                            stroke="#F8F8F8"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>`;
  recipeCard.appendChild(svgHeart);

  ///////////////////////////////////////////////////////
  const cardBottomWrapper = document.createElement('div');
  cardBottomWrapper.classList.add('card-bottom__block-wrapper');
  recipeCard.appendChild(cardBottomWrapper);
  ///////////////////////////////////////////

  const ratingWrapper = document.createElement('div');
  ratingWrapper.classList.add('card-bottom__rating-wrapper');
  cardBottomWrapper.appendChild(ratingWrapper);

  const ratingNumber = document.createElement('span');
  ratingNumber.classList.add('rating-number');
  ratingNumber.textContent = recipeData.rating;
  ratingWrapper.appendChild(ratingNumber);

  const ratingStarsList = document.createElement('ul');
  ratingStarsList.classList.add('recipe-card_rating-stars-list');
  ratingWrapper.appendChild(ratingStarsList);

  // stars
  const numStars = Math.round(recipeData.rating);
  for (let i = 0; i < 5; i += 1) {
    const starElement = document.createElement('li');
    starElement.classList.add('star');
    starElement.innerHTML = `
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                    >
                      <path
                        d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                      />
                    </svg>`;

    if (i < numStars) {
      starElement.classList.add('filled');
    }
    ratingStarsList.appendChild(starElement);
  }

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'See recipe';
  btn.classList.add('see-recipe_button');
  // add recipe-id attribute for open modal window
  btn.setAttribute('recipe-id', recipeData._id);
  cardBottomWrapper.appendChild(btn);

  return recipeCard;
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
import _ from 'lodash';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { pagination } from './pagination';

const searchInput = document.querySelector('#searchInput');
const timeSelect = document.querySelector('#time');
const areaSelect = document.querySelector('#area');
const ingredientsSelect = document.querySelector('#ingredients');
const resetFiltersBtn = document.querySelector('#resetButton');

searchInput.addEventListener(
  'input',
  _.debounce(event => filterByParameter(event, 'title'), 300)
);
timeSelect.addEventListener('change', event => filterByParameter(event, 'time'));
areaSelect.addEventListener('change', event => filterByParameter(event, 'area'));
ingredientsSelect.addEventListener('change', event => filterByParameter(event, 'ingredient'));
resetFiltersBtn.addEventListener('click', resetFilters);
categoriesList.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }

  filterByParameter(event, 'category');
});

renderTimeOptions();
let timeSelectSlim = new SlimSelect({
  select: '#time',
  settings: {
    placeholderText: '0 min',
  },
});
function renderTimeOptions() {
  let elements = '';

  for (let i = 5; i <= 120; i += 5) {
    elements += renderSelectOptions(i, `${i} min`);
  }

  timeSelect.insertAdjacentHTML('beforeend', elements);
}

getAreas();
let areaSelectSlim;
async function getAreas() {
  try {
    const areasData = await API.fetchAreas();
    const sortedAreaData = sortByAlphabet(areasData, 'name');

    const elements = sortedAreaData.map(element => renderSelectOptions(element._id, element.name)).join('');

    areaSelect.insertAdjacentHTML('afterbegin', elements);
    areaSelectSlim = new SlimSelect({
      select: '#area',
      settings: {
        placeholderText: 'Region',
      },
    });
  } catch (error) {
    throw error;
  }
}

getIngredients();
let ingredientsSelectSlim;
async function getIngredients() {
  try {
    const ingredientsData = await API.fetchIngredients();
    const sortedIngredientsData = sortByAlphabet(ingredientsData, 'name');

    const elements = sortedIngredientsData.map(element => renderSelectOptions(element._id, element.name)).join('');

    ingredientsSelect.insertAdjacentHTML('afterbegin', elements);
    ingredientsSelectSlim = new SlimSelect({
      select: '#ingredients',
      settings: {
        placeholderText: 'Product',
      },
    });
  } catch (error) {
    throw error;
  }
}

const selectedFilters = {
  category: '',
  title: '',
  time: '',
  area: '',
  ingredient: '',
};
async function filterByParameter(event, parameterName) {
  try {
    allCategoriesBtn.classList.remove('is-active');
    let selectedValue = '';
    const targetEl = event.target;

    if (targetEl.id === 'time') {
      selectedValue = targetEl.options[targetEl.selectedIndex].dataset.query;
    } else if (targetEl.id === 'area') {
      selectedValue = targetEl.options[targetEl.selectedIndex].textContent;
    } else if (targetEl.id === 'ingredients') {
      selectedValue = targetEl.options[targetEl.selectedIndex].dataset.query;
    } else if (targetEl.tagName === 'A') {
      selectedValue = targetEl.textContent;

      const activeCategoryItem = categoriesList.querySelector('.is-active');
      if (activeCategoryItem) {
        activeCategoryItem.classList.remove('is-active');
      }
      targetEl.closest('.categorie-items').classList.add('is-active');
    } else {
      selectedValue = targetEl.value.trim();
    }

    selectedFilters[parameterName] = selectedValue;
    const response = await API.fetchRecipes(selectedFilters);
    pag._itemsPerPage = response.perPage;
    pag._totalItems = response.totalPages;
    pag.createPag().on('beforeMove', e => {
      pag.renderCategories({ ...selectedFilters, ...e });
    });

    const recipeResults = response.results;
    renderFilteredRecipes(recipeResults);
    showFetchingResult(recipeResults);
  } catch (error) {
    console.error('Error fetching data:', error);

    Notiflix.Notify.failure('Invalid input. Please try another one!');
    throw error;
  }
}

function renderFilteredRecipes(data) {
  const elements = data.map(renderRecipeCard);
  recipesList.innerHTML = '';
  recipesList.append(...elements);
}

function renderSelectOptions(value, name) {
  return `<option data-query="${value}">${name}</option>`;
}

function sortByAlphabet(data, key) {
  return data.sort((a, b) => a[key].localeCompare(b[key]));
}

function showFetchingResult(data) {
  if (data.length === 0) {
    Notiflix.Notify.failure('No matcher were found');
  } else {
    Notiflix.Notify.success(`We found ${data.length} matches!`);
  }
}

function getAllCategories() {
  populateRecipesList();
  resetFilters();
}

function resetFilters() {
  searchInput.value = '';

  timeSelectSlim.destroy();
  timeSelect.selectedIndex = 0;
  timeSelectSlim = new SlimSelect({
    select: '#time',
    settings: {
      placeholderText: '0 min',
    },
  });

  areaSelectSlim.destroy();
  if (!areaSelect.firstElementChild.dataset.placeholder) {
    areaSelect.insertAdjacentHTML('afterbegin', '<option data-placeholder="true"></option>');
  }
  areaSelect.selectedIndex = 0;
  areaSelectSlim = new SlimSelect({
    select: '#area',
    settings: {
      placeholderText: 'Region',
    },
  });

  ingredientsSelectSlim.destroy();
  if (!ingredientsSelect.firstElementChild.dataset.placeholder) {
    ingredientsSelect.insertAdjacentHTML('afterbegin', '<option data-placeholder="true"></option>');
  }
  ingredientsSelect.selectedIndex = 0;
  ingredientsSelectSlim = new SlimSelect({
    select: '#ingredients',
    settings: {
      placeholderText: 'Product',
    },
  });

  selectedFilters.category = '';
  selectedFilters.title = '';
  selectedFilters.time = '';
  selectedFilters.area = '';
  selectedFilters.ingredient = '';

  populateRecipesList();
}

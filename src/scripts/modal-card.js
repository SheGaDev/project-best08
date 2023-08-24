import { getRecipeById } from './modal-card-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getFavoriteItem, toggleFavoriteItem } from '@utils/local-storage-service';

const refs = {
  backdrop: document.querySelector('.backdrop'),
  modalRecipe: document.querySelector('.modal-recipe'),
};
let currentRecipe = {};

async function onClickOpenRecipeModal(e) {
  e.preventDefault();
  const elemTarget = e.target.closest('[recipe-id]');
  if (elemTarget === null) {
    return;
  }
  const idRecipe = elemTarget.getAttribute('recipe-id');
  let isFavorite = getFavoriteItem(idRecipe) !== undefined;

  try {
    const recipeData = await getRecipeById(idRecipe);

    currentRecipe = recipeData;
    refs.modalRecipe.innerHTML = createModalRecipe(recipeData, isFavorite);
    refs.backdrop.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal-card-btn').addEventListener('click', onClickFavoriteBtn);

    document.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onBackdropClick);
    document.querySelector('#modal-close-btn').addEventListener('click', closeModal);
  } catch (error) {
    Notify.failure('Sorry...Please try again!');
    console.log(error);
  }
}
function closeModal(e) {
  refs.backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onBackdropClick);
  document.querySelector('#modal-close-btn').removeEventListener('click', closeModal);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === refs.backdrop) {
    closeModal();
  }
}

function createModalRecipe(data, isFavorite) {
  const { _id, title, preview, youtube, tags, rating, time, ingredients, instructions } = data;
  return `<div class="modal-recipe-container" recipe-id="${_id}">
  <button id="modal-close-btn" class="close-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="close-icon"
    >
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  </button>
  <h2 class="modal-card-name not-hidden-component">${title}</h2>
  <div class="modal-img-tumb">
    <img
      class="modal-img"
      srcset="${preview}"
      src="https://www.themealdb.com/images/media/meals/wurrux1468416624.jpg"
      alt="name"
    />
  </div>
  <!-- <iframe
    class="modal-iframe"
    src="https://www.youtube.com/embed/e52IL8zYmaE"
    height="295px"
    width="295px"
    frameborder="0"
    allowfullscreen
  ></iframe> -->

  <h2 class="modal-card-name is-hidden-component">${title}</h2>
  <div class="modal-card-attributes">
    <ul class="modal-card-attributes-tags not-hidden-component">
      ${createMarkupForTags(tags)}
    </ul>
    <ul class="modal-card-rating-value">
      <li class="rating-value">${rating}</li>
      <li class="star-wrap">
        <ul class="star-wrap-ul">${createMarkupForStar(rating)}</ul>
      </li>
      <li class="time-value">${time} min</li>
    </ul>
  </div>

  <div class="modal-card-info-wrap">
    <div class="modal-card-ingredients-block">
    ${createMarkupForIngred(ingredients)}
    </div>
    <div class="is-hidden-component">
      <ul class="modal-card-attributes-tags attributes-tags-style-mobile">
      ${createMarkupForTags(tags)}
      </ul>
    </div>
    <p class="modal-card-about-descr">${instructions}</p>
  </div>
  <div class="modal-card-btn-wrap">
    <button type="button" class="modal-card-btn" recipe-id="${_id}">
      ${isFavorite ? 'Remove from favorite' : 'Add to favorite'}  
    </button>
  </div>
</div>
    
<div>
</div>`;
}
function createMarkupForTags(arr) {
  const processedArr = arr.filter(elem => elem !== '');
  const markupForTags = processedArr
    .map(
      tag =>
        ` <li class="item-tags">
        <div class="item-tags-style">#${tag}</div>
      </li>`
    )
    .slice(0, 3)
    .join(' ');
  return markupForTags;
}
function createMarkupForIngred(arrObj) {
  const markupForIngred = arrObj
    .map(
      ingredient =>
        ` <div class="modal-card-ingredients">
            <ul class="modal-card-ingredients-item">
              <li class="ingredients-name">${ingredient.name}</li>
              <li class="ingredients-measure">${ingredient.measure}</li>
            </ul>
          </div>`
    )
    .join(' ');

  return markupForIngred;
}

// stars
function createMarkupForStar(ratingStar) {
  const numStars = Math.round(ratingStar);
  const arrForMarkup = [];

  for (let i = 1; i <= 5; i += 1) {
    if (i <= numStars) {
      arrForMarkup[i - 1] = `
    <li>
      <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      class="star filled"
      >
      <path
        d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
        />
      </svg>
    </li>`;
    } else
      arrForMarkup[i - 1] = `
    <li>
      <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      class="star"
      >
      <path
        d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41222 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146677 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
        />
      </svg>
    </li>`;
  }
  return arrForMarkup.join(' ');
}

function onClickFavoriteBtn(e) {
  const idRecipe = e.currentTarget.getAttribute('recipe-id');
  let isFavorite = getFavoriteItem(idRecipe) !== undefined;

  toggleFavoriteItem(currentRecipe);

  if (isFavorite) {
    document.querySelector('.modal-card-btn').textContent = 'Add to favorite';
  } else {
    document.querySelector('.modal-card-btn').textContent = 'Remove from favorite';
  }
}

export { onClickOpenRecipeModal };

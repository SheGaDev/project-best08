// import { refs } from "@api/refs";
import { getCategories, getFavoriteItems, asyncToggleFavoriteItem } from "../lib/utils/local-storage-service";
import { renderRecipeCard } from "./recipes-render";
import { onClickOpenRecipeModal } from './modal-card';
// import { pagination } from './pagination';

const refs = {
    favoriteHeroSection: document.querySelector(".hero-favorites-section"),
    emptyFavoriteSection: document.querySelector(".empty-favorite-list-section"),
    favoriteCategoriesSection: document.querySelector(".favorite-categories-section"),
    favoriteCardsSection: document.querySelector(".favorite-cards-section"),
    
    favoriteCategoriesList: document.querySelector(".favorite-categories-box"),
    favoriteCategoryBtn: document.querySelector(".favorite-categories-btn"),
    favoriteCardsList: document.querySelector(".favorite-cards-list"),
}

// let favoriteItems = JSON.parse(localStorage.getItem('favorites'));
let favoriteItems = getFavoriteItems().results;
console.log(favoriteItems);

if (favoriteItems && favoriteItems.length !== 0) {
    refs.favoriteHeroSection.classList.remove('unvisible');
    refs.emptyFavoriteSection.classList.add('is-hidden');
    refs.favoriteCategoriesSection.classList.remove('is-hidden');
    refs.favoriteCardsSection.classList.remove('is-hidden');
}

let favoriteCategoriesArray = getCategories(favoriteItems);
let selectedCategory = '';
// let page = 1;
localStorage.setItem('currentCategory', selectedCategory);

let currentFavoriteCategory = localStorage.getItem('currentCategory', selectedCategory);
console.log(currentFavoriteCategory);

if (currentFavoriteCategory !== 'All') {
    favoriteItems = getFavoriteItems({ category: `${currentFavoriteCategory}` });          // object or only selectedCategory ??????? //
} else {
    favoriteItems;
}

console.log(favoriteCategoriesArray);
renderFavoriteCategories(favoriteCategoriesArray);
renderFavoriteCards(favoriteItems);

function renderFavoriteCategories(array) {
    refs.favoriteCategoriesList.innerHTML = `<button type="button" class="favorite-categories-btn">All categories</button>`;
    for (let i = 0; i < array.length; i += 1) {
        let markup = `<button type="button" class="favorite-categories-btn">${array[i]}</button>`;
        refs.favoriteCategoriesList.insertAdjacentHTML('beforeend', markup);
    }
}

function renderFavoriteCards(favoriteItems) {
    refs.favoriteCardsList.innerHTML = '';
    const elements = favoriteItems.map(renderRecipeCard);
refs.favoriteCardsList.append(...elements);
    }


// ------------- //

refs.favoriteCardsList.addEventListener('click', onClickOpenRecipeModal);
refs.favoriteCardsList.addEventListener('click', onFavoriteCardClick);

refs.favoriteCategoriesList.addEventListener('click', createFilteredCards);

async function onFavoriteCardClick(evt) {
    evt.preventDefault();
    if (evt.target.className !== 'favourite-heart') {
        return;
    }
    let recipeId = evt.target.closest('[_id]');           // check id !!!!! //
    await asyncToggleFavoriteItem(recipeId);
    
    renderFavoriteCategories();      // async ???????????? //
    renderFavoriteCards();           // async ???????????? //
}

function createFilteredCards(evt) {
    evt.preventDefault();

    // let selectedCategory = evt.target.value;
    selectedCategory = evt.target.value;

    if (selectedCategory === 'All categories') {
        selectedCategory = 'All';
    }
    // localStorage.setItem('currentCategory', selectedCategory);

    let selectedCards = getFavoriteItems(selectedCategory);          // object or only selectedCategory ??????? //
    renderFavoriteCards(selectedCards.results);

// refs.favoriteCardsList.addEventListener('click', onFavoriteCardClick);          // necessary ????? //

// refs.favoriteCategoriesList.addEventListener('click', createFilteredCards);    // necessary ????? //

}
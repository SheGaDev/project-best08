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
    // favoriteCardsContainer: document.querySelector(".favorite-cards-container"),
    favoriteCardsList: document.querySelector(".favorite-cards-list"),
    favoriteCardsBox: document.querySelector(".favorite-cards-box"),
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
console.log(favoriteCategoriesArray);
renderFavoriteCategories(favoriteCategoriesArray);
console.log(favoriteItems);
renderFavoriteCards(favoriteItems);
// const favoriteCardClick = document.querySelector(".favorite-cards-box");
// favoriteCardClick.addEventListener('click', onClickOpenRecipeModal);

function renderFavoriteCategories(array) {
    refs.favoriteCategoriesList.innerHTML = `<button type="button" class="favorite-categories-btn">All categories</button>`;
    for (let i = 0; i < array.length; i += 1) {
        let markup = `<button type="button" class="favorite-categories-btn">${array[i]}</button>`;
        refs.favoriteCategoriesList.insertAdjacentHTML('beforeend', markup);
    }
}

function renderFavoriteCards(array) {
    refs.favoriteCardsBox.innerHTML = '';
    
    for (let i = 0; i < array.length; i += 1) { 
        let card = renderRecipeCard(array[i]);
        refs.favoriteCardsBox.appendChild(card);
        console.log(card);
    }

    const favoriteCardClick = document.querySelector(".favorite-cards-box");
    favoriteCardClick.addEventListener('click', onClickOpenRecipeModal);
}

// ------------- //


refs.favoriteCardsList.addEventListener('click', onFavoriteCardClick);

refs.favoriteCategoriesList.addEventListener('click', createFilteredCards);

async function onFavoriteCardClick(evt) {
    evt.preventDefault();
    if (evt.target.className !== 'favourite-heart') {
        return;
    }
    let recipeId = evt.currentTarget.closest('[recipe-id]');           
    // console.log(recipeId);                                  // check id !!!!! //
    await asyncToggleFavoriteItem(recipeId);
    
    renderFavoriteCategories();     
    renderFavoriteCards();          

    // evt.stopPropagation();
}

function createFilteredCards(evt) {
    evt.preventDefault();

    selectedCategory = evt.target.textContent;
    console.log(selectedCategory);

    if (selectedCategory === 'All categories') {
        selectedCategory = 'All';
    }

    let selectedCards = getFavoriteItems({category: `${selectedCategory}`}).results;          // object or only selectedCategory ??????? //
    console.log(selectedCards);
    renderFavoriteCards(selectedCards);
    
// refs.favoriteCardsList.addEventListener('click', onFavoriteCardClick);          // necessary ????? //
// refs.favoriteCategoriesList.addEventListener('click', createFilteredCards);    // necessary ????? //
}
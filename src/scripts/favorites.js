// import { refs } from "@api/refs";
import { getStorageFavorites, getCategories, getFavoriteItems, asyncToggleFavoriteItem } from "../lib/utils/local-storage-service";
import { renderRecipeCard } from "./recipes-render";
import { onClickOpenRecipeModal } from '../../scripts/modal-card';

const refs = {
    favoriteHeroSection: document.querySelector(".hero-favorites-section"),
    emptyFavoriteSection: document.querySelector(".empty-favorite-list-section"),
    favoriteCategoriesSection: document.querySelector(".favorite-categories-section"),
    favoriteCardsSection: document.querySelector(".favorite-cards-section"),
    
    favoriteCategoriesList: document.querySelector(".favorite-categories-box"),
    favoriteCategoryBtn: document.querySelector(".favorite-categories-btn"),
    favoriteCardsList: document.querySelector(".favorite-cards-list"),
}

let favoriteItems = getStorageFavorites();

if (favoriteItems && favoriteItems.length !== 0) {
    refs.favoriteHeroSection.classList.remove('unvisible');
    refs.emptyFavoriteSection.classList.add('is-hidden');
    refs.favoriteCategoriesSection.classList.remove('is-hidden');
    refs.favoriteCardsSection.classList.remove('is-hidden');
}

let currentFavoriteCategory = localStorage.getItem('currentCategory', selectedCategory);

if (currentFavoriteCategory !== 'All') {
    favoriteItems = getFavoriteItems(currentFavoriteCategory);          // object or only selectedCategory ??????? //
} else {
    favoriteItems;
}

let favoriteCategoriesArray = getCategories(favoriteItems);
renderFavoriteCategories(favoriteCategoriesArray);

let favoriteItemsData = getFavoriteItems();
renderFavoriteCards(favoriteItemsData.results);

refs.favoriteCardsList.addEventListener('click', onClickOpenRecipeModal);
refs.favoriteCardsList.addEventListener('click', onFavoriteCardClick);

refs.favoriteCategoriesList.addEventListener('click', createFilteredCards);

//export/import
function createFavoriteCategoriesMarkup(array) {
    array.forEach(element => {
        return `<button type="button" class="favorite-categories-btn">${element}</button>`;
    });
}
// .join('')

//export/import
function renderFavoriteCategories(array) {
    refs.favoriteCategoriesSection.innerHTML = '';
    // const favoriteCategories = getCategoriesInFavorites(array);
    const favoriteCategoriesMarkup = createFavoriteCategoriesMarkup(array);
    refs.favoriteCategoriesSection.insertAdjacentHTML('beforeend', favoriteCategoriesMarkup);
}

//export/import
function renderFavoriteCards(array) {
    refs.favoriteCardsSection.innerHTML = '';
    array.map((object) => {
    refs.favoriteCardsSection.insertAdjacentHTML('beforeend', renderRecipeCard(object));
});
}

// export/import      !!!!!! async !!!!!!!!!
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

    let selectedCategory = evt.target.value;
    if (selectedCategory === 'All categories') {
        selectedCategory = 'All';
    }
    localStorage.setItem('currentCategory', selectedCategory);

    getFavoriteItems(selectedCategory);          // object or only selectedCategory ??????? //
    renderFavoriteCards(favoriteItemsData.results);

// refs.favoriteCardsList.addEventListener('click', onFavoriteCardClick);          // necessary ????? //

// refs.favoriteCategoriesList.addEventListener('click', createFilteredCards);    // necessary ????? //

}
// import { refs } from "@api/refs";
import { getFavoriteItems } from "../lib/utils/local-storage-service";
import { renderRecipeCard } from "./recipes-render";

const refs = {
    favoriteHeroSection: document.querySelector(".hero-favorites-section"),
    emptyFavoriteSection: document.querySelector(".empty-favorite-list-section"),
    favoriteCategoriesSection: document.querySelector(".favorite-categories-section"),
    favoriteCardsSection: document.querySelector(".favorite-cards-section"),
    
    favoriteCategoriesList: document.querySelector(".favorite-categories-box"),
    favoriteCategoryBtn: document.querySelector(".favorite-categories-btn"),

    favoriteHeart: document.querySelector(".favourite-heart"),
    seeRecipeBtn: document.querySelector("see-recipe_button"),
}

//Основна логіка написана для випадку, коли у localStorage зберігається масив об'єктів (масив карток з рецептами)
// const FAVORITE_KEY = "favorites";
let favoriteItems = getFavoriteItems();

// array with objects(recipes) if (favoriteItems || favoriteItems.length !== 0)  or favoriteRecipe !== ''
if (favoriteItems || favoriteItems.length !== 0) {
    refs.favoriteHeroSection.classList.remove('unvisible');
    refs.emptyFavoriteSection.classList.add('is-hidden');
    refs.favoriteCategoriesSection.classList.remove('is-hidden');
    refs.favoriteCardsSection.classList.remove('is-hidden');
}

//export/import
// favoriteRecipe.forEach((element) => { let favoriteCategories = []; favoriteCategories.push(localStorage.getItem("element").category) })
function getCategoriesInFavorites(array) {
    let favoriteCategories = [];
    array.map(({ category }) => {
        favoriteCategories.push(category).filter((category, index, array) => { array.indexOf(category) === index });
        return favoriteCategories;
    })
}

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
    const favoriteCategories = getCategoriesInFavorites(array);
    const favoriteCategoriesMarkup = createFavoriteCategoriesMarkup(favoriteCategories);
    refs.favoriteCategoriesSection.insertAdjacentHTML('beforeend', favoriteCategoriesMarkup);
}

//export/import
// favoriteItems.forEach((element) => { let favoriteCards = []; favoriteCards.push(localStorage.getItem("element"))})
function renderFavoriteCards(array) {
    refs.favoriteCardsSection.innerHTML = '';
    array.map((object) => {
    refs.favoriteCardsSection.insertAdjacentHTML('beforeend', renderRecipeCard(object));
});
}

//export/import
// function removeFavoriteItem(evt) {
//     evt.preventDefault();
//     // recive key!!!!!
//     let key = evt.currentTarget.key;
//     locacStorage.removeItem(key);
    
//     renderFavoriteCategories();
//     renderFavoriteCards();
// }

renderFavoriteCategories(favoriteItems);
renderFavoriteCards(favoriteItems);
// refs.favoriteHeart.addEventListener('click', removeFavoriteItem);
refs.favoriteCategoryBtn.addEventListener('click', createFilteredCards);
// refs.seeRecipeBtn.addEventListener('click', openModalWindow);

// function openModalWindow(evt) {
//     evt.preventDefault();
// }


function createFilteredCards(evt) {
    evt.preventDefault();

    let selectedCategory = evt.currentTarget.value;

    let filteredCards = [];
    favoriteItems.map((object) => {
        if (object.category === selectedCategory) {
            filteredCards.push(object);
        }
    })
    renderFavoriteCards(filteredCards);
}





import { getFavoriteItems } from '../lib/utils/local-storage-service';

// const FAVORITE_KEY = "favorites";
const favoriteItems = getFavoriteItems;
const favoriteCategories = [];

const mediaQueryCondition = window.matchMedia('( max-width: 677px )');

const refs = {
    favoriteHeroSection: document.querySelector(".hero-favorites-section"),
    emptyFavoriteSection: document.querySelector(".empty-favorite-list-section"),
    favoriteCategoriesSection: document.querySelector(".favorite-categories-section"),
    favoriteCardsSection: document.querySelector(".favorite-cards-section"),
}

if (mediaQueryCondition.matches) {
    if (!favoriteItems || favoriteItems.length === 0) {
        refs.favoriteHeroSection.classList.add('is-hidden');
    }
}


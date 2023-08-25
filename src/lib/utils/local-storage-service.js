import { API } from "../api";

function getTheme() {
    return localStorage.getItem("theme") ?? "light";
}
const themes = ["light", "dark"]
function changeTheme(theme) {
    if (!theme || !themes.includes(theme)) throw new Error("No 'light' or 'dark' specified");
    localStorage.setItem("theme", theme);
    return theme;
}

/**
* Асинхронно додає або забирає об'єкт даних рецепта з localStorage["favorites"]
*
* @param {string} _id Ідентифікатор рецепта.
*/
async function asyncToggleFavoriteItem(_id) {
    if (!_id || typeof _id !== "string") throw new Error("No ID is specified or this is not a string");
    const items = getStorageFavorites();
    if (items.length && items.some(item => item._id === _id)) {
        removeFavoriteItem(items, _id);
    } else {
        const recipe = await API.fetchRecipe(_id);
        addFavoriteItem(items, recipe);
    }
}
/**
* Додає або забирає об'єкт даних рецепта з localStorage["favorites"]
*
* @param {object} recipe Об'єкт даних рецепта.
*/
function toggleFavoriteItem(recipe) {
    if (!recipe || typeof recipe !== "object") throw new Error("Not a recipe data object");
    const items = getStorageFavorites();
    if (items.length && items.some(item => item._id === recipe._id)) {
        removeFavoriteItem(items, recipe._id);
    } else addFavoriteItem(items, recipe);
}
/**
 * 
 * @param {object} options
 * { page: default = 1, category: default = "All" }
 * @returns 
 */
function getFavoriteItems(options = {}) {
    options.page = options?.page ?? 1;
    options.category = options?.category ?? "All";
    if (typeof options.page !== "number") throw new Error("This is not number");
    if (options.category !== "All") checkCategories(options.category);
    const items = getStorageFavorites();
    const filtered = options.category === "All" ? items : items.filter(item => item.category === options.category);
    const categories = getCategories(items);
    const perPage = 12;
    const totalPages = Math.ceil(filtered.length / perPage);
    if (totalPages < options.page) options.page = 1;
    const data = {
        page: options.page,
        totalPages,
        categories,
        results: filtered.slice((options.page - 1) * perPage, (options.page - 1) * perPage + perPage)
    }
    return data;
}
/**
 * 
 * @param {string} _id ідентифікатор рецепта 
 * @returns повертає об'єкт рецепта або undefined;
 */
function getFavoriteItem(_id) {
    if (!_id || typeof _id !== "string") throw new Error("No ID is specified or this is not a string");
    const items = getStorageFavorites();
    const recipe = items.find(item => item._id === _id);
    return recipe;
}

/**
 * 
 * @param {object} items 
 * @returns Повертає масив категорій що є в localStorage["favorites"]
 */
function getCategories(items) {
    const categories = [];
    for (let i = 0; i < items.length; i++) {
        if (categories.includes(items[i].category)) continue;
        categories.push(items[i].category);
    }
    return categories;
}

function checkCategories(category) {
    const categories = API.getCategories;
    if (categories.includes(category)) throw new Error("No category found");
}
function addFavoriteItem(items, recipe) {
    items.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(items));
}
function removeFavoriteItem(items, _id) {
    for (let i = 0; i < items.length; i++) {
        if (items[i]._id !== _id) continue;
        items.splice(i, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(items));
}
function getStorageFavorites() {
    const local = localStorage.getItem("favorites");
    return local ? JSON.parse(local) : [];
}
export {
    getTheme,
    changeTheme,
    asyncToggleFavoriteItem,
    toggleFavoriteItem,
    getFavoriteItems,
    getFavoriteItem,
    getCategories,
    getStorageFavorites
}
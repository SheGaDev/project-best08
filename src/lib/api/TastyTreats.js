import axios from 'axios';
axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api/';

export default class TastyTreatsAPI {
    constructor() {
        this.cache = {
            categories: [],
            areas: [],
            ingredients: [],
        };
        this.currentPage = 1;
    }
    // { page, title, category, area, ingredient, time }
    requestJoin(data) {
        let query = "limit=9";
        for (const [key, value] of Object.entries(data)) {
            query += `&${key}=${value}`;
        }
        return query;
    }
    async fetchRecipes(data = {}) {
        const response = await axios(`recipes?${this.requestJoin(data)}`);
        return response.data;
    }
    async fetchRecipe(recipeId) {
        const response = await axios(`recipes/${recipeId}`);
        return response.data;
    }
    async fetchEvents() {
        const response = await axios('events');
        return response.data;
    }
    async fetchCategories() {
        if (this.getCategories.length) return this.getCategories;
        const response = await axios('categories');
        this.cache.categories = [...response.data];
        return response.data;
    }
    async fetchAreas() {
        if (this.getAreas.length) return this.getAreas;
        const response = await axios('areas');
        this.cache.areas = [...response.data];
        return response.data;
    }
    async fetchIngredients() {
        if (this.getIngredients.length) return this.getIngredients;
        const response = await axios('ingredients');
        this.cache.ingredients = [...response.data];
        return response.data;
    }
    async getPopularRecipes() {
        const response = await axios('recipes/popular');
        return response.data;
    }
    get getCategories() {
        return this.cache.categories;
    }
    get getAreas() {
        return this.cache.areas;
    }
    get getIngredients() {
        return this.cache.ingredients;
    }
}

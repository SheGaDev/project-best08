import axios from "axios";
axios.defaults.baseURL = "https://tasty-treats-backend.p.goit.global/api/";

export default class TastyTreatsAPI {
    constructor() {
        this.cache = {
            categories: [],
            areas: [],
            ingredients: []
        }
        this.currentPage = 1;
    }
    // { title, category, area, ingredients, time }
    requestJoin(data) {
        const query = ["limit=9"];
        for (const [key, value] of Object.entries(data)) {
            query.push(`${key}=${value}`);
        }
        return query.join("&")
    }
    async fetchRecipes(data = {}) {
        const query = Object.keys(data).length ? `recipes?${this.requestJoin(data)}` : "recipes";
        const response = await axios(query);
        return response.data;
    }
    async fetchRecipe(recipeId) {
        const response = await axios(`recipes/${recipeId}`);
        return response.data;
    }
    async fetchEvents() {
        const response = await axios("events");
        return response.data;
    }
    async fetchCategories() {
        const response = await axios("categories");
        this.cache.categories = [...response.data];
        return response.data;
    }
    async fetchAreas() {
        const response = await axios("areas");
        this.cache.areas = [...response.data];
        return response.data;
    }
    async fetchIngredients() {
        const response = await axios("ingredients");
        this.cache.ingredients = [...response.data];
        return response.data;
    }
    async getPopularRecipes() {
        const response = await axios("recipes/popular");
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
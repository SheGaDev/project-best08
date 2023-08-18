
import { getRecipeById } from './modal-card-service';
const recipeClick = document.querySelector('.button-click');
console.log(recipeClick);
recipeClick.addEventListener('click', onRecipeValues);

async function onRecipeValues(e) {
    e.preventDefault();
    const idRecipe = recipeClick.name;
    try {
        const recipeById = await getRecipeById(idRecipe);



    }
}
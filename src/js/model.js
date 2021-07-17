import { API_URL } from '../js/config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
};
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJson(`${API_URL}/${recipeId}`);
    // console.log(data);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    //console.error(`${err} 🐞`);
    throw err;
  }
};

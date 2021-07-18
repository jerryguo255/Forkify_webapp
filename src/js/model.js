import { API_URL } from '../js/config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    recipeList: [],
    query: '',
  },
};
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJson(`${API_URL}/${recipeId}`);
    // console.log(data);
    const { recipe } = data.data;
    state.recipe = recipe;
  } catch (err) {
    //console.error(`${err} 🐞`);
    throw err;
  }
};

export const loadRecipeList = async function (keyword) {
  try {
    //console.log(keyword);
    const data = await getJson(`${API_URL}?search=${keyword}`);

    state.search.query = keyword;
    state.search.recipeList = data.data.recipes;
  } catch (error) {
    throw err;
  }
};

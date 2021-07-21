import { API_URL } from './config.js';
import { getJson } from './helpers.js';
import { PAGE_MAX_ITEMS } from './config.js';

export const state = {
  recipe: {},
  search: {
    recipeList: [],
    formatedRecipeList: [],
    query: '',
    //currentPageList: [],
    // nextPage: [],
    currentPage: 1,
    // maxPageNumber,
  },
};

export const getRecipesPage = function (pageNum) {
  state.currentPage = pageNum;

  const startIndex = (pageNum - 1) * PAGE_MAX_ITEMS;
  const endIndex = pageNum * PAGE_MAX_ITEMS - 1;

  return state.search.recipeList.slice(startIndex, endIndex);
};
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJson(`${API_URL}/${recipeId}`);
    // console.log(data);
    const { recipe } = data.data;
    state.recipe = recipe;
  } catch (err) {
    // console.error(`${err} 🐞`);
    throw err;
  }
};

export const loadRecipeList = async function (keyword) {
  try {
    state.search.query = keyword;
    const data = await getJson(`${API_URL}?search=${keyword}`);
    if (data.results === 0)
      throw new Error('No recipes found for your query! Please try again ;)');

    state.search.recipeList = data.data.recipes;

    // check
  } catch (error) {
    //console.log(error);
    throw error;
  }
};

// /**
//  *
//  * @param {dsa} direction
//  */
// export const getCurrentPageRecipes = function (direction) {
//   if (direction === DIRECTION.leftShrit) {
//   }
//   if (direction === DIRECTION.rightShift) {
//   }
//   return state.search.currentPage;
// };

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(i => {
    i.quantity = (i.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
  //console.log(state.recipe);
};

import { API_URL } from './config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    recipeList: [],
    formatedRecipeList: [],
    query: '',
    currentPage: 0,
    //currentPageList: [],
    // nextPage: [],
    // currentPageNum: 1,
    // maxPageNumber,
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

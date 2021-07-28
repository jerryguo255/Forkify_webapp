import { API_URL } from './config.js';
import { getJson } from './helpers.js';
import { PAGE_MAX_ITEMS } from './config.js';

export const state = {
  recipe: {},
  bookmarkList: [],
  search: {
    recipeList: [],
    // formatedRecipeList: [],
    query: '',
    //currentPageList: [],
    // nextPage: [],
    currentPage: 1,
    // maxPageNumber,
  },
};

//add current recipe to bookmarkList
export const addRecipe = function () {
  state.bookmarkList.push(state.recipe);
  persistBookmarkList();
};

//remove current recipe to bookmarkList
export const removeRecipe = function () {
  // state.bookmarkList = state.bookmarkList.filter(v => v.id !== state.recipe.id);
  state.bookmarkList.splice(
    state.bookmarkList.findIndex(v => v.id === state.recipe.id),
    1
  );
  persistBookmarkList();
};

const persistBookmarkList = () =>
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarkList));

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  state.bookmarkList = JSON.parse(storage);
};
init();

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

    //if the recipe is alread on bookmark list, load it,
    if (state.bookmarkList.some(v => v.id === recipe.id)) {
      recipe.marked = true;
    }
    state.recipe = recipe;
    //if does not find it, load new one
  } catch (err) {
    console.error(`${err} 🐞`);
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
    //set to first page for new searching
    state.search.currentPage = 1;
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

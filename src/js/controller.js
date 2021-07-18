import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeListView from './views/recipeListView';

// for bable in the parcel to polyfill 'promise'
import 'regenerator-runtime/runtime';
// for bable in the parcel to polyfill other ES 6 and above features
import 'core-js/stable';
import searchView from './views/searchView.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//https://forkify-api.herokuapp.com/api/v2/recipes/:id

const controlRecipe = async function () {
  try {
    //get hash value from url
    const id = window.location.hash.slice(1);
    if (!id) return;

    //render a spinner first , while getting data
    recipeView.renderSpinner();

    //move next only when loadRecipe finished(get and load data in state)
    await model.loadRecipe(id);

    // send data to view
    recipeView.renderRecipeArea(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

const controlSearchResults = async function () {
  try {
    //get search query
    const queryKeywords = searchView.getQuery();
    if (!queryKeywords) return;

    // load search results
    await model.loadRecipeList(queryKeywords);

    //render it
    recipeListView.renderRecipeList(model.state.search.recipeList);
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

const init = function () {
  //Publish–subscribe pattern
  //subscriber

  searchView.addHandlerToSearchBar(controlSearchResults);

  //add
  recipeView.addHandlerDom(controlRecipe);
};

init();
//#endregion

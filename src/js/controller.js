import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeListView from './views/recipeListView';
import bookmarkListView from './views/bookmarkListView.js';
// for bable in the parcel to polyfill 'promise'
import 'regenerator-runtime/runtime';
// for bable in the parcel to polyfill other ES 6 and above features
import 'core-js/stable';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { AUTO_CLOSE_SEC } from './config.js';
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    //SD3-03 get hash value from url,
    const id = window.location.hash.slice(1);
    if (!id) return;

    //render a spinner first , while getting data
    recipeView.renderSpinner();

    //SR1-05 whenever recipe page changed, highlight the item that user selected
    //  check if there is a recipelist loaded
    if (model.state.search.recipeList.length !== 0) {
      //update background colour of selected item on recipe list
      recipeListView.update(
        model.getRecipesPage(model.state.search.currentPage)
      );
    }

    //LD6-05 whenever recipe page changed, highlight the item that user selected
    bookmarkListView.update(model.state.bookmarkList);

    //SD3-04 load the recipe and render it
    await model.loadRecipe(id);
    // send data to view
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

//AS4-03 handle click event
const controlServings = function (newServings) {
  model.updateServings(newServings);

  //AS4-05 only updating changed value, instead of rendering whole page
  recipeView.update(model.state.recipe);

  // recipeView.render(model.state.recipe);
};

/**load search results, if > PAGE_MAX_ITEMS, do pagination
 *
 * @returns
 */

const controlSearchResults = async function () {
  //let state = model.state.search;
  try {
    //get search query
    const queryKeywords = searchView.getQuery();
    if (!queryKeywords) return;

    recipeListView.renderSpinner();

    //SR1-02 loading search results
    await model.loadRecipeList(queryKeywords);

    //SR1-04 render first page of recipe list
    recipeListView.render(model.getRecipesPage(1));

    //SP2-01 render pagination buttons
    paginationView.render(model.state.search);

    // const itemAmount = state.recipeList.length;

    // const getPageAmount = function () {
    //   // const pageAmount =
    //   //   itemAmount % PAGE_MAX_ITEMS == 0
    //   //     ? Math.floor(itemAmount / PAGE_MAX_ITEMS)
    //   //     : Math.floor(itemAmount / PAGE_MAX_ITEMS) + 1;

    //   //     return pageAmount;
    //   return Math.ceil(itemAmount / PAGE_MAX_ITEMS);
    // };
    // const pageAmount = getPageAmount();

    // const formatedRecipeList = function () {
    //   const formatedList = [];

    //   //load pages
    //   for (let i = 0; i < pageAmount; i++) {
    //     const page = [];
    //     let pageItemsAmount = PAGE_MAX_ITEMS;

    //     //if it's last page
    //     if (i === pageAmount - 1) {
    //       pageItemsAmount = state.recipeList.length;
    //     }
    //     //load items to page
    //     for (let j = 0; j < pageItemsAmount; j++) {
    //       page.push(state.recipeList.pop());
    //     }

    //     formatedList.push(page);
    //   }
    //   state.formatedRecipeList = formatedList;
    // };

    // const renderRecipes = function () {
    //   switch (state.currentPage) {
    //     //first page
    //     case 1:
    //       recipeListView.setPrevBtnText(state.currentPage - 1);
    //       recipeListView.setNextBtnText(state.currentPage + 1);
    //       recipeListView.showNextBtn();
    //       recipeListView.hidePrevBtn();
    //       break;
    //     //last page
    //     case pageAmount:
    //       recipeListView.setPrevBtnText(state.currentPage - 1);
    //       recipeListView.setNextBtnText(state.currentPage + 1);
    //       recipeListView.showPrevBtn();
    //       recipeListView.hideNextBtn();
    //       break;
    //     default:
    //       recipeListView.setPrevBtnText(state.currentPage - 1);
    //       recipeListView.setNextBtnText(state.currentPage + 1);
    //       recipeListView.showPrevBtn();
    //       recipeListView.showNextBtn();

    //       break;
    //   }
    //   recipeListView.render(state.formatedRecipeList[state.currentPage - 1]);
    // };

    //////////process start

    //get amount of items

    //paginate or not
    // if (itemAmount > PAGE_MAX_ITEMS) {
    //   //distribute all items

    //   formatedRecipeList();
    //   state.currentPage = 1;
    //   renderRecipes();
    //   // results within one page

    //   const controlPaginationPrev = function () {
    //     state.currentPage--;
    //     renderRecipes();

    //     //prev page
    //   };
    //   const controlPaginationNext = function () {
    //     state.currentPage++;
    //     renderRecipes();

    //     // next page
    //   };
    //   recipeListView.addHandlerBtns(
    //     controlPaginationPrev,
    //     controlPaginationNext
    //   );
    // } else {
    //   //render
    //   recipeListView.render(state.recipeList);
    // }
    // //model.getCurrentPageRecipes();
    // // recipeListView.toggleSetNextBtn(5);
  } catch (error) {
    console.error(error);
    recipeListView.renderError(error.message);
  }
};

const controlRecipeBookmark = function () {
  //BS5-02 add or remove bookmark when user click
  if (!model.state.recipe.marked) {
    model.state.recipe.marked = true;
    model.addRecipe();
  } else {
    model.state.recipe.marked = false;
    model.removeRecipe();
  }

  //BS5-03 update btn
  recipeView.update(model.state.recipe);

  //LD6-03 when bookmark btn click also render bookmark list
  controlBookmarkList();
  //console.log(model.state.bookmarkList);
};

const controlPagination = function () {
  //SP2-06 re-render recipe list and pagination buttons
  recipeListView.render(model.getRecipesPage(model.state.search.currentPage));
  paginationView.render(model.state.search);
};

const controlBookmarkList = function () {
  //LD6-04 render bookmark list
  //check if there is bookmarklist loaded
  model.state.bookmarkList.length !== 0
    ? bookmarkListView.render(model.state.bookmarkList)
    : bookmarkListView.renderMessage(bookmarkListView._errorMessage);
  //
};

// AR7 show or close form window when user click
const showAddRecipeForm = function () {
  addRecipeView.showForm();
};
const closeAddRecipeForm = function () {
  addRecipeView.closeForm();
};

//to API also load to model, then change hash
const controlRecipeForm = async function (recipeData) {
  try {
    addRecipeView.renderSpinner();
    //AR7-03  upload recipe to API
    await model.uploadRecipe(recipeData);
    //AR7-07 after uploaded , show message and close form
    addRecipeView.renderMessage('😀 Successed uploaded! ');
    setTimeout(closeAddRecipeForm, AUTO_CLOSE_SEC);

    // recipeView.render(model.state.recipe);
    // model.addRecipe(model.state.recipe);
    //AR7-08 change hash , trigger event, reload recipe page
    window.location.hash = model.state.recipe.id;
  } catch (error) {
    addRecipeView.renderError(error);
  }
};

const init = function () {
  //Publish–subscribe pattern
  //subscriber
  //add Event handlers to elements

  //LD6
  bookmarkListView.addHandlerWindow(controlBookmarkList);

  //SD3
  recipeListView.addHandlerWindow(controlRecipe);

  //SR1
  searchView.addHandlerToSearchBar(controlSearchResults);

  //AS4
  recipeView.addHandlerBtns(controlServings);

  //BS5
  recipeView.addHandlerBookmarkBtn(controlRecipeBookmark);

  //SP2
  paginationView.addHandlerPagination(controlPagination);

  //AR7
  addRecipeView.addHandlerNavBtn(showAddRecipeForm);
  addRecipeView.addHandlerClose(closeAddRecipeForm);
  addRecipeView.addHandlerFormSubmit(controlRecipeForm);
};

init();

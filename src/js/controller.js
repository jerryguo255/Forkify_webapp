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

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    //get hash value from url
    const id = window.location.hash.slice(1);
    if (!id) return;

    //render a spinner first , while getting data
    recipeView.renderSpinner();

    //check if there is recipelist loaded
    if (model.state.search.recipeList.length !== 0) {
      //update background colour of selected item on recipe list
      recipeListView.update(
        model.getRecipesPage(model.state.search.currentPage)
      );
    }

    //check if there is bookmarklist loaded
    if (model.state.bookmarkList.length !== 0) {
      //update background colour of selected item on recipe list
      bookmarkListView.update(model.state.bookmarkList);
    }

    await model.loadRecipe(id);

    // send data to view
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  // shold be updating, instead of rendering whole page
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

    // load search results
    await model.loadRecipeList(queryKeywords);

    //render first page of recipe list
    recipeListView.render(model.getRecipesPage(1));

    //render pagination buttons
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
  //when bookmark btn click, execute this handler
  //compare stored bookmarkList
  if (!model.state.recipe.marked) {
    model.state.recipe.marked = true;
    model.addRecipe();
  } else {
    model.state.recipe.marked = false;
    model.removeRecipe();
  }
  recipeView.update(model.state.recipe);

  model.state.bookmarkList.length !== 0
    ? bookmarkListView.render(model.state.bookmarkList)
    : bookmarkListView.renderMessage(bookmarkListView._errorMessage);
  //
  //console.log(model.state.bookmarkList);
};

const controlPagination = function () {
  // model.state;

  recipeListView.render(model.getRecipesPage(model.state.search.currentPage));

  //render pagination buttons
  paginationView.render(model.state.search);
};
const init = function () {
  //Publish–subscribe pattern
  //subscriber

  searchView.addHandlerToSearchBar(controlSearchResults);

  //add
  recipeView.addHandlerWindow(controlRecipe);

  recipeView.addHandlerBtns(controlServings);

  recipeView.addHandlerBookmarkBtn(controlRecipeBookmark);

  paginationView.addHandlerPagination(controlPagination);
};

init();
//#endregion

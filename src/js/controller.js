import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeListView from './views/recipeListView';
import { DIRECTION } from './config.js';
import { PAGE_MAX_ITEMS } from './config.js';
// for bable in the parcel to polyfill 'promise'
import 'regenerator-runtime/runtime';
// for bable in the parcel to polyfill other ES 6 and above features
import 'core-js/stable';
import searchView from './views/searchView.js';

if (module.hot) {
  module.hot.accept();
}
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
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error.message);
  }
};

/**load search results, if > PAGE_MAX_ITEMS, do pagination
 *
 * @returns
 */
const controlSearchResults = async function () {
  let state = model.state.search;
  try {
    //get search query
    const queryKeywords = searchView.getQuery();
    if (!queryKeywords) return;

    recipeListView.renderSpinner();

    // load search results
    await model.loadRecipeList(queryKeywords);

    //calc page amount

    const itemAmount = state.recipeList.length;

    const getPageAmount = function () {
      // const pageAmount =
      //   itemAmount % PAGE_MAX_ITEMS == 0
      //     ? Math.floor(itemAmount / PAGE_MAX_ITEMS)
      //     : Math.floor(itemAmount / PAGE_MAX_ITEMS) + 1;

      //     return pageAmount;
      return Math.ceil(itemAmount / PAGE_MAX_ITEMS);
    };
    const pageAmount = getPageAmount();

    const formatedRecipeList = function () {
      const formatedList = [];

      //load pages
      for (let i = 0; i < pageAmount; i++) {
        const page = [];
        let pageItemsAmount = PAGE_MAX_ITEMS;

        //if it's last page
        if (i === pageAmount - 1) {
          pageItemsAmount = state.recipeList.length;
        }
        //load items to page
        for (let j = 0; j < pageItemsAmount; j++) {
          page.push(state.recipeList.pop());
        }

        formatedList.push(page);
      }
      state.formatedRecipeList = formatedList;
    };

    const renderRecipes = function () {
      switch (state.currentPage) {
        //first page
        case 1:
          recipeListView.setPrevBtnText(state.currentPage - 1);
          recipeListView.setNextBtnText(state.currentPage + 1);
          recipeListView.showNextBtn();
          recipeListView.hidePrevBtn();
          break;
        //last page
        case pageAmount:
          recipeListView.setPrevBtnText(state.currentPage - 1);
          recipeListView.setNextBtnText(state.currentPage + 1);
          recipeListView.showPrevBtn();
          recipeListView.hideNextBtn();
          break;
        default:
          recipeListView.setPrevBtnText(state.currentPage - 1);
          recipeListView.setNextBtnText(state.currentPage + 1);
          recipeListView.showPrevBtn();
          recipeListView.showNextBtn();

          break;
      }
      recipeListView.render(state.formatedRecipeList[state.currentPage - 1]);
    };

    //////////process start

    //get amount of items

    //paginate or not
    if (itemAmount > PAGE_MAX_ITEMS) {
      //distribute all items

      formatedRecipeList();
      state.currentPage = 1;
      renderRecipes();
      // results within one page

      const controlPaginationPrev = function () {
        state.currentPage--;
        renderRecipes();

        //prev page
      };
      const controlPaginationNext = function () {
        state.currentPage++;
        renderRecipes();

        // next page
      };
      recipeListView.addHandlerBtns(
        controlPaginationPrev,
        controlPaginationNext
      );
    } else {
      //render
      recipeListView.render(state.recipeList);
    }
    //model.getCurrentPageRecipes();
    // recipeListView.toggleSetNextBtn(5);

    // 空容器占位
  } catch (error) {
    console.error(error);
    recipeListView.renderError(error.message);
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

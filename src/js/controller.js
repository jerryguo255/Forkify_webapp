// tell controller.js file where the svg file is
import icons from 'url:../img/icons.svg';
// for bable in the parcel to polyfill 'promise'
import 'regenerator-runtime/runtime';
// for bable in the parcel to polyfill other ES 6 and above features
import 'core-js/stable';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//https://forkify-api.herokuapp.com/api/v2/recipes/:id
const renderSpinner = function (parentEl) {
  const markup = ` 
  <div class="spinner">
  <svg>
  <use href="${icons}#icon-loader"></use>
  </svg>
  </div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const removeSpinner = function (parentEl) {
  const element = parentEl.querySelectorAll('.spinner');
  //console.log(element);
  parentEl.removeChild(element[0]);
};

//#region  listen hashchange and load event

['hashchange', 'load'].forEach(v => {
  window.addEventListener(v, () => {
    showRecipe(window.location.hash);
  });
});

//#endregion

//#region 1. show recipe get recipe data from API
const showRecipe = async function (recipeID) {
  try {
    // 1.1 get the recipe data from API
    renderSpinner(recipeContainer);
    const res = await fetch(
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID.slice(1)}`
    ); //5ed6604591c37cdc054bca57

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 1.2 Rendering recipe
    const markup = `
          <figure class="recipe__fig">
                <img src="${
                  recipe.image
                }" alt="Tomato" class="recipe__img" crossorigin/>
                <h1 class="recipe__title">
                  <span>${recipe.title}</span>
                </h1>
              </figure>

              <div class="recipe__details">
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes">${
                    recipe.cookingTime
                  }</span>
                  <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people">${
                    recipe.servings
                  }</span>
                  <span class="recipe__info-text">servings</span>

                  <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--increase-servings">
                      <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                      </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings">
                      <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="recipe__user-generated">
                  <svg>
                    <oinuse href="${icons}#icon-user"></use>
                  </svg>
                </div>
                <button class="btn--round">
                  <svg class="">
                    <use href="${icons}#icon-bookmark-fill"></use>
                  </svg>
                </button>
              </div>

              <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients
                  .map(ing => {
                    return `
                     <li class="recipe__ingredient">
                      <svg class="recipe__icon">
                         <use href="${icons}#icon-check"></use>
                        </svg>
                    <div class="recipe__quantity">${ing.quantity}</div>
                          <div class="recipe__description">
                          <span class="recipe__unit">${ing.unit}</span>
                          ${ing.description}
                        </div>
                      </li>
                  `;
                  })
                  .join('')}

                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">1000</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">g</span>
                      pasta
                    </div>
                  </li>

                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">0.5</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">cup</span>
                      ricotta cheese
                    </div>
                  </li>
                </ul>
              </div>

              <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__publisher">${
                    recipe.publisher
                  }</span>. Please
                  check out directions at their website.
                </p>
                <a
                  class="btn--small recipe__btn"
                  href="${recipe.sourceUrl}"
                  target="_blank"
                >
                  <span>Directions</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
                </a>
              </div> 
    `;
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
    // 1.3 clear message and loading spinner
    removeSpinner(recipeContainer);
  } catch (err) {
    console.log(console.error(err));
  }
};

//showRecipe();
//#endregion

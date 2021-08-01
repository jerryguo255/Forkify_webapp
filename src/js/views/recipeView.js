// tell controller.js file where the svg file is
import icons from 'url:../../img/icons.svg';
import View from './view';
import { Fraction } from 'fractional';
import { MAX_SERVINGS, POSTAPI_KEY } from '../config.js';
// import View from './view';

class RecipeAreaView extends View {
  _parentElement = document.querySelector('.recipe');

  _generateMarkup_Ingredients(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      //SD3-05 convers number to fraction before rendering
      ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
    </div>
    </li>
    `;
  }
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
        <img
          src="${this._data.image_url}"
          alt="Tomato"
          class="recipe__img"
          crossorigin
        />
  <h1 class="recipe__title">
    <span>${this._data.title}</span>
  </h1>
</figure>


<div class="recipe__details">
 <div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
  </svg>
 <span class="recipe__info-data recipe__info-data--minutes">
 ${this._data.cooking_time}
 </span>
    <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
    <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this._data.servings
    }</span>
    <span class="recipe__info-text">servings</span>
    
    <div class="recipe__info-buttons">
    <button class="btn--tiny btn--updating-servings" data-servings="${
      //AS4-01 set serving number to puls or minus btn
      this._data.servings - 1
    }">
    <svg>
    <use href="${icons}#icon-minus-circle"></use>
    </svg>
    </button>
    <button class="btn--tiny btn--updating-servings" data-servings="${
      this._data.servings + 1
    }">
    <svg>
    <use href="${icons}#icon-plus-circle"></use>
    </svg>
    </button>
    </div>
    </div>
    
  <div class="recipe__user-generated  ${
    this._data.key !== POSTAPI_KEY ? 'hidden' : ''
  }">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round btn--bookmark">
    <svg class="">
      <use href="${icons}#icon-bookmark${
      //BS5-04 set icon before update
      this._data.marked ? '-fill' : ''
    }"></use>
    </svg>
  </button>

  
  
    </div>
    
    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    
    ${this._data.ingredients.map(this._generateMarkup_Ingredients).join('')}
      
      </ul>
      </div>
      
      <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${this._data.publisher}</span>. Please
      check out directions at their website.
      </p>
      <a
      class="btn--small recipe__btn"
      href="${this._data.source_url}"
      target="_blank"
      >
      <span>Directions</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </a>
      </div> 
      `;
  }

  //AS4-02 when user click serving btn, invoke handler
  addHandlerBtns(handler) {
    //get servings btn (via event delegation)
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--updating-servings');
      if (!btn) return;
      //set max servings
      if (btn.dataset.servings < 1 || btn.dataset.servings > MAX_SERVINGS)
        return;

      handler(+btn.dataset.servings);
    });
  }

  //BS5-01 when user click bookmark btn, invoke handler
  addHandlerBookmarkBtn(handler) {
    //get servings btn (via event delegation)
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }
}
export default recipeAreaView = new RecipeAreaView();

// tell controller.js file where the svg file is
import icons from 'url:../../img/icons.svg';
import View from './view';
import { Fraction } from 'fractional';
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
    
  <div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round btn--bookmark">
    <svg class="">
      <use href="${icons}#icon-bookmark${
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
  //public API

  //Publisher
  addHandlerBtns(handler) {
    //event delegation
    this._parentElement.addEventListener('click', function (e) {
      //get target btns
      const btn = e.target.closest('.btn--updating-servings');
      if (!btn) return;

      if (btn.dataset.servings < 1 || btn.dataset.servings > 10) return;

      handler(+btn.dataset.servings);
      //handler();
    });
  }

  addHandlerWindow(handler) {
    //Publish–subscribe pattern
    //listen hashchange and load event
    ['hashchange', 'load'].forEach(v => window.addEventListener(v, handler));
  }

  addHandlerBookmarkBtn(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      console.log(btn);
      //contrtol bookmark
      //if alread marked, unmark
      //if not marked
      handler();
    });
  }
}
export default recipeAreaView = new RecipeAreaView();

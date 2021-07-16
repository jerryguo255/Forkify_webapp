// tell controller.js file where the svg file is
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  //public API
  render(data) {
    this.#data = data;

    this.#clear();
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.#generateMarkup()
    );
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkupIngredient(ing) {
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
  #generateMarkup() {
    return `
          <figure class="recipe__fig">
                <img src="${
                  this.#data.image
                }" alt="Tomato" class="recipe__img" crossorigin/>
                <h1 class="recipe__title">
                  <span>${this.#data.title}</span>
                </h1>
              </figure>

              <div class="recipe__details">
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes">${
                    this.#data.cookingTime
                  }</span>
                  <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people">${
                    this.#data.servings
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
                ${this.#data.ingredients
                  .map(this.#generateMarkupIngredient)
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
                    this.#data.publisher
                  }</span>. Please
                  check out directions at their website.
                </p>
                <a
                  class="btn--small recipe__btn"
                  href="${this.#data.sourceUrl}"
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
  renderSpinner() {
    const markup = ` 
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>`;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //   removeSpinner() {
  //     console.log(this.#parentElement);
  //     const element = this.#parentElement.querySelectorAll('.spinner');

  //     console.log(element);
  //     this.#parentElement.removeChild(element[0]);
  //   }
}
export default new RecipeView();

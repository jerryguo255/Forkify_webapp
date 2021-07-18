import icons from 'url:../../img/icons.svg';
class RecipeListView {
  #parentEl = document.querySelector('.results');
  #data;

  #generateMarkup(recipe) {
    //console.log(recipe);
    const markup = ` 
      <li class="preview">
          <a class="preview__link" href="#${recipe.id}" >
           <figure class="preview__fig">
             <img src="${recipe.image_url}" alt="Test" crossorigin/>
            </figure>
              <div class="preview__data">
                <h4 class="preview__title">
                  ${recipe.title.trim()}
                </h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
          </a>
       </li>`;
    // markup.join();
    //console.log(markup);
    return markup;
  }

  renderRecipeList(dataList) {
    // console.log(dataList);
    this.#data = dataList;
    this.#data.forEach(element =>
      this.#parentEl.insertAdjacentHTML(
        'afterbegin',
        this.#generateMarkup(element)
      )
    );
  }

  //public methods
}

export default recipeListView = new RecipeListView();

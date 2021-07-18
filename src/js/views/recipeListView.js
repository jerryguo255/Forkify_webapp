import icons from 'url:../../img/icons.svg';
import View from './view';

class RecipeListView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    const html = this._data.map(
      recipe => ` 
    <li class="preview">
        <a class="preview__link "  href="#${recipe.id}" >
         <figure class="preview__fig">
           <img src="${recipe.image_url}" alt="${recipe.title}" crossorigin/>
          </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
            </div>
        </a>
     </li>`
    );

    return html;
    // const markup = ;
    // markup.join();
    //console.log(markup);
    //return markup;
  }

  activeRecipe(id) {}
}

export default recipeListView = new RecipeListView();

import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.add-recipe-window');
  _formElement = document.querySelector('.upload');
  _addRecipeNavBtn = document.querySelector('.nav__btn--add-recipe');
  _overlayEl = document.querySelector('.overlay');
  _closeBtn = document.querySelector('.btn--close-modal');

  closeForm() {
    this._parentElement.classList.add('hidden');
    this._overlayEl.classList.add('hidden');
  }

  showForm() {
    this._parentElement.classList.remove('hidden');
    this._overlayEl.classList.remove('hidden');
  }

  // AR7 add handlers to elements
  //AR7-01 open or close form window when user click
  addHandlerNavBtn(handler) {
    this._addRecipeNavBtn.addEventListener('click', handler);
  }
  addHandlerClose(handler) {
    this._closeBtn.addEventListener('click', handler);
    this._overlayEl.addEventListener('click', handler);
  }

  //AR7-02 invoke handler with form data when user submit
  addHandlerFormSubmit(handler) {
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const [...formData] = new FormData(this);
      const data = Object.fromEntries(formData);
      handler(data);
    });
    // this._formElement.addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   console.log('sss');
    // });
  }
}
export default addRecipeView = new AddRecipeView();

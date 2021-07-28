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

  //AR7-04 open form window
  showForm() {
    this._parentElement.classList.remove('hidden');
    this._overlayEl.classList.remove('hidden');
  }

  //#region AR7 add handlers to elements
  addHandlerNavBtn(handler) {
    //AR7-01 open form window
    this._addRecipeNavBtn.addEventListener('click', handler);
  }
  addHandlerClose(handler) {
    //AR7-02 close form window
    this._closeBtn.addEventListener('click', handler);
    this._overlayEl.addEventListener('click', handler);
  }

  addHandlerFormSubmit(handler) {
    //AR7-03 when submitting, invoke handler with form data
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const [...formData] = new FormData(this);
      const data = Object.fromEntries(formData);
      console.log(data);
    });
    // this._formElement.addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   console.log('sss');
    // });
  }
  //#endregion
}
export default addRecipeView = new AddRecipeView();

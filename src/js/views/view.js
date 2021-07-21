import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderError(errorMessage) {
    const markup = `      
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
    </div>`;

    //clear the spinner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = 'view gets wrong') {
    const markup = `
     <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    //console.log(this._data);
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateMarkup()
    );
  }
  renderSpinner() {
    const markup = ` 
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

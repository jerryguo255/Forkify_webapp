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

  // only update different part of the view, instead of whole view
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    // convert markup to html DOM tree
    const newDomTree = document
      .createRange()
      .createContextualFragment(this._generateMarkup());

    // travers DOM tree to NodeList
    const currentNodelist = this._parentElement.querySelectorAll('*');
    const newNodelist = newDomTree.querySelectorAll('*');

    // convert to array
    const currentArr = Array.from(currentNodelist);
    const newArr = Array.from(newNodelist);

    //compare each pair of element
    currentArr.forEach(function (curr, i) {
      //get new element
      const newEl = newArr[i];

      //check if they are same
      const isDifferentFromOtherNode = !curr.isEqualNode(newEl);

      /**
       * chech if the element's first child is not the text
       * (because parent element also different as long as anyone child is different,
       * but only child has Text Node need to be replce, instead of all other child. )
       */
      const isNotTextNode = newEl.firstChild?.nodeValue.trim() !== '';

      if (isDifferentFromOtherNode && isNotTextNode) {
        // replace only different text
        curr.textContent = newEl.textContent;
      }

      // also replace data attributes
      if (isDifferentFromOtherNode) {
        //traverse all attributes of the node
        Array.from(newEl.attributes).forEach((attr, i) => {
          //check if the attribute name start with ‘data’
          if (attr.name.slice(0, 4) === 'data') {
            //replace it with new value
            curr.setAttribute(attr.name, attr.value);
          }
        });
      }
    });
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

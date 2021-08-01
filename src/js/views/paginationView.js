import View from './view';
import icons from 'url:../../img/icons.svg';
import { PAGE_MAX_ITEMS } from '../config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    //SP2-03 determine how to render pagination btns
    const itemAmount = this._data.recipeList.length;
    const pageAmount = Math.ceil(itemAmount / PAGE_MAX_ITEMS);
    // only 1 page
    if (itemAmount < PAGE_MAX_ITEMS) return ' ';

    // first page
    if (this._data.currentPage == 1) {
      //   console.log(this);
      return this._generateBtnsMarkup('next');
    }

    // last page
    if (this._data.currentPage >= pageAmount) {
      return this._generateBtnsMarkup('prev');
    }

    // other page
    return (
      this._generateBtnsMarkup('prev') + '' + this._generateBtnsMarkup('next')
    );
  }

  //SP2-02 calculate page number for the btn
  /**
   *
   * @param {string} btnName:'prev' or 'next'
   * @returns {markup string}
   */
  _generateBtnsMarkup(btnName) {
    switch (btnName) {
      case 'prev':
        return `      
            <button class="btn--inline pagination__btn--prev "data-goto-page="${
              +this._data.currentPage - 1
            }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${+this._data.currentPage - 1}</span>
            </button>
             `;

      case 'next':
        return `      
              <button class="btn--inline pagination__btn--next " data-goto-page="${
                +this._data.currentPage + 1
              }">
                  <span>Page ${+this._data.currentPage + 1}</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
              </button>   `;
    }
  }
  _generateBtnsNextMarkup() {}
  //event delegation
  //handler == controlPagination

  //SP2-04 add event handler to btns
  addHandlerPagination(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        //SP2-05 whenever click, set current page in model, then invoke
        this._data.currentPage =
          e.target.closest('.btn--inline').dataset.gotoPage;
        handler();
      }.bind(this)
    );
  }

  //
}

export default paginationView = new PaginationView();
